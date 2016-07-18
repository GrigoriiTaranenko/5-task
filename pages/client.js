/**
 * Created by Sergey on 15.07.2016.
 */
var router=require('../Router');
var template=require('../templates/client.ejs');
var _=require('lodash');

var Client=function (){
    router.user=null;
    router.role='anonymous';
    Client.User=[];
    Client.ReadAjax();
    this.template=template;
};

Client.prototype.render=function(){
    router.elem.html(template);
    router.elem.on('click', '#Registration',this.client)
};

Client.ValueIsLocal = function(Name){
    return _.filter(Client.User,{"name":Name})
};

Client.prototype.client =function () {
    var UserName=router.elem.find('.moi:first').val();
    if (UserName && Client.ValueIsLocal(UserName).length==0){
        Client.AddAjax(UserName);
        router.goto('auth');
    }
    else alert('Уже есть такой пользователь');
};

Client.prototype.close=function(){
    router.elem.off('click');
};
Client.ReadAjax=function() {
    router.ajax({
        url: "http://localhost:3000/api/names",
        async: false,
        success: function (data) {
            Client.User = data;
        }
    })
};
Client.AddAjax=function(name){
    var write={
        "name":name,
        "role":"client"
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
module.exports=Client;