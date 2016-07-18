/**
 * Created by Sergey on 17.07.2016.
 */
var router = require('../Router');
var template = require('../templates/assignperformer.ejs');
var _=require('lodash');

var Assignperformer=function (pages){
    this.template=template;
    Assignperformer.data=pages.data;
    Assignperformer.Table=[];
    Assignperformer.ReadTableAjax();
    Assignperformer.Table=Assignperformer.Table[Assignperformer.data];
    Assignperformer.User=[];
    Assignperformer.ReadAjax();
    Assignperformer.User=_.filter(Assignperformer.User,{role:"performer"});
    this.events();
};
Assignperformer.prototype.render=function(){
    router.elem.html(this.template(Assignperformer.User))
};

Assignperformer.prototype.events= function(){
    router.elem.on('click','.add',this.addAsignperformer)
};


Assignperformer.prototype.addAsignperformer=function(){
    var performer=router.elem.find('select').val();
    if (performer) {
        Assignperformer.Table.performer = performer;
        Assignperformer.AssignValue(Assignperformer.Table)
    }else alert("Не назначен");
    router.goto('application',{
        data:Assignperformer.data
    })

};
Assignperformer.AssignValue=function(collection){
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

Assignperformer.ReadTableAjax=function(){
    router.ajax({
        url:"http://localhost:3000/api/tables",
        async:false,
        success:function (data) {
            Assignperformer.Table=data
        }
    })
};
Assignperformer.ReadAjax=function() {
    router.ajax({
        url: "http://localhost:3000/api/names",
        async: false,
        success: function (data) {
            Assignperformer.User = data;
        }
    })
};
Assignperformer.prototype.close=function(){
    router.elem.off();
};
module.exports=Assignperformer;