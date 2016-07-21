/**
 * Created by Sergey on 15.07.2016.
 */
var router=require('../Router');
var template=require('../templates/client.ejs');
var _=require('lodash');
var UserAjax=require('../server/user');

var Client=function (){
    router.user=null;
    router.role='anonymous';
    this.users=[];
    this.template=template;
};

Client.prototype.render=function(){
    var self=this;
    router.elem.html(template);
    router.elem.on('click', '#Registration',this, function(){
        self.client()
    })
};

Client.prototype.ValueIsLocal = function(Name){
    return _.find(this.users,{"name":Name})
};

Client.prototype.client =function () {
    var UserName=router.elem.find('.moi:first').val();
    if (UserName && !this.ValueIsLocal(UserName)){
        this.addAjax(UserName,'client');
    }
    else alert('Уже есть такой пользователь');
};

Client.prototype.close=function(){
    router.elem.off('click');
};
Client.prototype.Ajax=function(){
    var self=this;
    var user=new UserAjax();
    return user.write().then(function(data){
        self.users=data;
        return data;
    })
};
Client.prototype.addAjax=function (UserName,role) {
    var user=new UserAjax;
    return user.read(UserName,role).then(function(){
        router.goto('auth');
    })
};
module.exports=Client;