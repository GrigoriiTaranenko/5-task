var router = require('../Router');
var template = require('../templates/auth.ejs');
var _=require('lodash');

var Auth = function () {
    router.user = null;
    router.role = 'anonymous';
    Auth.User=[];
        Auth.readAjax();
    this.template = template();
};

Auth.prototype.render = function () {
    router.elem.html(this.template);
    router.elem.on('click', '#auto', this.auth);
};


Auth.prototype.auth = function () {
    var username = router.elem.find('#Login').val();
    var user=Auth.getUser(username);
    // TODO: обавить проверку и поиск пользователя в localStorage
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

Auth.getUser=function(Name){
    var LocalName=_.filter(Auth.User,{"name":Name});
    if (LocalName.length!=0)
        if (LocalName[0].role == 'admin' ||
            LocalName[0].role == 'client' ||
            LocalName[0].role == 'performer'
        ) return LocalName[0];
        else return false;
};
Auth.readAjax=function(){
    router.ajax({
        url: "http://localhost:3000/api/names",
        async: false,
        success: function (data) {
            Auth.User = data;
        }
    });
};

module.exports = Auth;