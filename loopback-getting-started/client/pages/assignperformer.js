/**
 * Created by Sergey on 17.07.2016.
 */
var router = require('../Router');
var template = require('../templates/assignperformer.ejs');
var _=require('lodash');
var TableAjax=require('../server/table');
var UserAjax=require('../server/user');

var Assignperformer=function (pages){
    this.template=template;
    this.tables=pages.table;
    this.users=[];
    this.events();
};
Assignperformer.prototype.render=function(){
    router.elem.html(this.template(this.users))
};

Assignperformer.prototype.events= function(){
    var self=this;
    router.elem.on('click','.add', function () {
        self.addAsignperformer()
    })
};


Assignperformer.prototype.close=function(){
    router.elem.off();
};


Assignperformer.prototype.addAsignperformer=function(){
    var performer=router.elem.find('select').val();
    if (performer && performer!='') {
        this.tables.performer = performer;
        this.AssignValue(this.tables)
    }else alert("Не назначен");
};


Assignperformer.prototype.AssignValue=function(collection){
    console.log(collection);
    var table=new TableAjax();
    return table.readPATCH(collection).then(function (data) {
        router.goto('application',{
            table:data
        })
    })
};



Assignperformer.prototype.Ajax=function() {
    var self=this;
    var user=new UserAjax();
    return user.write().then(function (data) {
        self.users=data;
        self.users=_.filter(self.users,{role:"performer"});
    })
};


module.exports=Assignperformer;