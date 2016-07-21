var router = require('../Router');
var template = require('../templates/auth.ejs');
var _=require('lodash');
var UserAjax=require('../server/user');
var $=require('jquery');

var Auth = function () {
    router.user = null;
    router.role = 'anonymous';
    this.users=[1];
    this.template = template();
    this.events();
};
Auth.prototype.render = function () {
    router.elem.html(this.template);
};

Auth.prototype.events= function(){
    var self = this;
    router.elem.on('click', '#auto',this, function (event) {
        self.auth(event.data.users);
    });
};

Auth.prototype.auth = function () {
    var username = router.elem.find('#Login').val();
    var user=this.getUser(username,this.users);
    if (user) {
        router.user = username;
        router.role = user.role;

        router.goto('table', {
            user: username,
            role: user.role
        });
    }
    else {
        alert('Нельзя!')
    }
};

Auth.prototype.close = function () {
    router.elem.off('click');
};

Auth.prototype.getUser=function(Name){
    var LocalName=_.filter(this.users,{"name":Name});
    if (LocalName.length!=0)
        if (LocalName[0].role == 'admin' ||
            LocalName[0].role == 'client' ||
            LocalName[0].role == 'performer'
        ) return LocalName[0];
        else return false;
};
Auth.prototype.Ajax=function(){
    var self=this;
    var user=new UserAjax();
    return user.write().then(function(data){
        self.users=data;
        return data;
    })
};

module.exports = Auth;