/**
 * Created by Sergey on 16.07.2016.
 */
var router = require('../Router');
var template = require('../templates/application.ejs');
var _=require('lodash');
var $=require('jquery');

var Application = function (params) {
    this.data = params.data;
    this.status=["online","offline"];
    Application.Table=[];
    Application.ReadTableAjax();
    Application.Table[this.data].estimated=Application.Table[this.data].estimated.substring(0,10);
    Application.Table[this.data].deadline=Application.Table[this.data].deadline.substring(0,10);
    console.log(Application.Table[this.data].estimated);
    if (Application.Table[this.data].client=='') Application.Table[this.data].client='Нет клиента';
    if (Application.Table[this.data].performer=='') Application.Table[this.data].performer='Не назначен';
    Application.tasklist={
        ApplicationWrite:Application.Table[this.data],
        status:this.swap(this.status,Application.Table[this.data].status),
        role:router.role
    };
    this.template = template;
    this.events();
};
Application.prototype.events=function () {
    router.elem.on('click','#change',{data:this.data}, this.save);
    router.elem.on('click','.create',{data:this.data}, this.CreateComment);
    router.elem.on('click','#RR',{data:this.data}, this.AddPerformer)
};

Application.prototype.render=function () {
    router.elem.html(this.template(Application.tasklist))
};

Application.prototype.close=function () {
    router.elem.off('click');
};


Application.prototype.save=function (event){
    var ApplicationWrite=Application.tasklist.ApplicationWrite;
    if (router.role=='performer') ApplicationWrite.status=router.elem.find('.status').val();
    if (router.role=='admin') {
        ApplicationWrite.estimated=router.elem.find('.estimated').val();
        ApplicationWrite.deadline=router.elem.find('.deadline').val();
        ApplicationWrite.readiness=router.elem.find('.readiness').val();
    }
    Application.AssignValue(ApplicationWrite)
};

Application.prototype.CreateComment=function (event){
    router.goto('comment',{
        data:event.data.data
    })
};

Application.prototype.AddPerformer=function(event){
    router.goto('assignperformer',{
        data:event.data.data
    })
};


Application.AssignValue=function(collection){
    console.log(collection);
    router.ajax({
        type:"PATCH",
        url:"http://localhost:3000/api/tables",
        async:false,
        data:collection,
        success:function (data) {
            console.log(data)
        }
    })
};

Application.ReadTableAjax=function(){
    router.ajax({
        url:"http://localhost:3000/api/tables",
        async:false,
        success:function (data) {
            Application.Table=data
        }
    })
};


Application.prototype.swap=function(array,elem){
    var i=0;
    while (array[i]!=elem) i++;
    array.splice(i,1);
    array.splice(0,0,elem);
    return array;
};


module.exports=Application;
