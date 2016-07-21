/**
 * Created by Sergey on 16.07.2016.
 */
var router = require('../Router');
var template = require('../templates/application.ejs');
var _=require('lodash');
var $=require('jquery');
var TableAjax=require('../server/table');

var Application = function (params) {
//    this.data = params.data;
    this.status=["online","offline"];
    this.tables=params.table;
    this.tables.estimated=this.tables.estimated.substring(0,10);
    this.tables.deadline=this.tables.deadline.substring(0,10);
    if (this.tables.client=='')
        this.tables.client='Нет клиента';
    if (this.tables.performer=='')
        this.tables.performer='Не назначен';
    this.tasklist={
        ApplicationWrite:this.tables,
        status:this.swap(this.status,this.tables.status),
        role:router.role
    };
    this.template = template;
    this.events();
};
Application.prototype.events=function () {
    var self=this;
    router.elem.on('click','#change', function () {
        self.save()
    });
    router.elem.on('click','.create', function () {
        self.CreateComment()
    });
    router.elem.on('click','#RR', function () {
        self.AddPerformer()
    })
};

Application.prototype.render=function () {
    router.elem.html(this.template(this.tasklist))
};

Application.prototype.close=function () {
    router.elem.off('click');
};


Application.prototype.save=function (){
    var ApplicationWrite=this.tables;
    if (router.role=='performer') ApplicationWrite.status=router.elem.find('.status').val();
    if (router.role=='admin') {
        ApplicationWrite.estimated=router.elem.find('.estimated').val();
        ApplicationWrite.deadline=router.elem.find('.deadline').val();
        ApplicationWrite.readiness=router.elem.find('.readiness').val();
    }
    this.AssignValue(ApplicationWrite)
};

Application.prototype.CreateComment=function (){
    router.goto('comment',{
        table:this.tables
    })
};

Application.prototype.AddPerformer=function(){
    router.goto('assignperformer',{
        table:this.tables
    })
};


Application.prototype.AssignValue=function(collection){
    this.tables=collection;
    var table=new TableAjax();
    table.readPATCH(collection)
};


Application.prototype.Ajax=function(){
    var table=new TableAjax;
    return table.write()
};

Application.prototype.swap=function(array,elem){
    var i=0;
    while (array[i]!=elem) i++;
    array.splice(i,1);
    array.splice(0,0,elem);
    return array;
};


module.exports=Application;
