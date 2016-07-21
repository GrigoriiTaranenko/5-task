/**
 * Created by Sergey on 16.07.2016.
 */
var router=require('../Router');
var template=require('../templates/performer.ejs');
var _=require('lodash');
var UserAjax=require('../server/user');

var Performer=function () {
    this.users=[];
    this.template=template;
};
Performer.prototype.render=function(){
    var self=this;
    router.elem.html(template);
    router.elem.on('click', '#RegistrationName',function(){
        self.performer();
    })
};

Performer.prototype.ValueIsLocal = function(Name){
    return _.filter(this.users,{"name":Name})
};

Performer.prototype.performer =function () {
    var UserName=router.elem.find('.moi:first').val();
    if (UserName && this.ValueIsLocal(UserName).length==0) {
        this.AddAjax(UserName);
    }
    else alert('Уже есть такой пользователь');
};

Performer.prototype.AddAjax=function(name){
    var user=new UserAjax();
    user.read(name,'performer').then(function(){
        router.goto('table',{
            user: router.user,
            role: router.role
        })
    })
};
Performer.prototype.close=function(){
    router.elem.off('click');
};

Performer.prototype.Ajax=function(){
    var self=this;
    var user=new UserAjax();
    return user.write().then(function(data){
        self.users=data;
        return data;
    })
};
module.exports=Performer;