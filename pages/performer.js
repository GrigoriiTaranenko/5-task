/**
 * Created by Sergey on 16.07.2016.
 */
var router=require('../Router');
var template=require('../templates/performer.ejs');
var _=require('lodash');

var Performer=function () {
    Performer.User=[];
    Performer.ReadAjax();
    this.template=template;
};
Performer.prototype.render=function(){
    router.elem.html(template);
    router.elem.on('click', '#RegistrationName',this.performer)
};

Performer.ValueIsLocal = function(Name){
    return _.filter(Performer.User,{"name":Name})
};

Performer.prototype.performer =function () {
    var UserName=router.elem.find('.moi:first').val();
    if (UserName && Performer.ValueIsLocal(UserName).length==0) {
        Performer.AddAjax(UserName);
        router.goto('table', {
            user: router.user,
            role: router.role
        })
    }
    else alert('Уже есть такой пользователь');
};

Performer.ReadAjax=function() {
    router.ajax({
        url: "http://localhost:3000/api/names",
        async: false,
        success: function (data) {
            Performer.User = data;
        }
    })
};
Performer.AddAjax=function(name){
    var write={
        "name":name,
        "role":"performer"
    };
    router.ajax({
        type: "POST",
        url: "http://localhost:3000/api/names",
        async: false,
        data: write,
        success: function (data) {
            console.log(data)
        }
    });
};
Performer.prototype.close=function(){
    router.elem.off('click');
};
module.exports=Performer;