/**
 * Created by Sergey on 16.07.2016.
 */
var router=require("../Router");
var template=require("../templates/editor.ejs");
var Editor=function () {
    this.template=template;
    Editor.Table=[];
    Editor.ReadTableAjax();
    this.elem={
        "name":"",
        "description":"",
        "client":"",
        "comment":"[]",
        "performer":"",
        "status":"",
        "readiness":0,
        "data":"",
        "estimated":"",
        "deadline":""
    }
};
Editor.prototype.render=function(){
    router.elem.html(template);
    router.elem.on('click', '.add',{elem:this.elem, DB:Editor.Table}, this.editor)
};

Editor.ValueIsLocal = function(collection){
    if (collection.name==""
        || collection.description==""
        || collection.estimated==""
        || collection.deadline=="") return false;
    else return true;
};

Editor.prototype.editor =function (event) {
    event.data.elem.name=router.elem.find('.Name').val();
    event.data.elem.description=router.elem.find(".ticket").val();
    event.data.elem.status=router.elem.find(".status").val();
    event.data.elem.estimated=router.elem.find(".estimated").val();
    event.data.elem.deadline=router.elem.find(".deadline").val();
    event.data.elem.data=event.data.DB.length;
    if (router.role!="admin") event.data.elem.client=router.user;
    if (event.data.elem.name!="" && (Editor.ValueIsLocal(event.data.elem))){
        Editor.AssignValue(event.data.elem,event.data.DB);
        router.goto('table', {
            user: router.user,
            role: router.role
        })    }
    else alert('Вам явно что-то не хватает');
};



Editor.AssignValue=function(collection){
    console.log(collection);
    JSON.stringify(collection);
    router.ajax({
        type:"Post",
        url:"http://localhost:3000/api/tables",
        async:false,
        data:collection,
        success:function (data) {
            console.log(data)
        }
    })
};

Editor.prototype.close=function(){
    router.elem.off('click');
};



Editor.ReadTableAjax=function(){
    router.ajax({
        url:"http://localhost:3000/api/tables",
        async:false,
        success:function (data) {
            Editor.Table=data
        }
    })
};
module.exports=Editor;