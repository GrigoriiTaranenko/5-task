/**
 * Created by Sergey on 16.07.2016.
 */
var router=require("../Router");
var template=require("../templates/editor.ejs");
var TableAjax=require("../server/table");
var Editor=function () {
    this.template=template;
    this.tables=[];
    this.elem={
        "name":"",
        "description":"",
        "client":"",
        "comment":"[]",
        "performer":"",
        "status":"",
        "readiness":0,
        "data":1,
        "estimated":"",
        "deadline":""
    }
};
Editor.prototype.render=function(){
    var self=this;
    router.elem.html(template);
    router.elem.on('click', '.add',this, function(){
        self.editor()
    })
};

Editor.ValueIsLocal = function(collection){
    if (collection.name==""
        || collection.description==""
        || collection.estimated==""
        || collection.deadline=="") return false;
    else return true;
};

Editor.prototype.editor =function () {
    this.elem.name=router.elem.find('.Name').val();
    this.elem.description=router.elem.find(".ticket").val();
    this.elem.status=router.elem.find(".status").val();
    this.elem.estimated=router.elem.find(".estimated").val();
    this.elem.deadline=router.elem.find(".deadline").val();
    this.elem.data=this.tables.length;
    if (router.role!="admin") this.elem.client=router.user;
    if (this.elem.name!="" && (Editor.ValueIsLocal(this.elem))){
        this.AssignValue();
        router.goto('table', {
            user: router.user,
            role: router.role
        })    }
    else alert('Вам явно что-то не хватает');
};



Editor.prototype.AssignValue=function(){
    var tables=new TableAjax();
    var self=this;
    tables.readPOST(self.elem).then(function(){
        router.goto('table',{user:router.user, role:router.role})
    })
};

Editor.prototype.close=function(){
    router.elem.off('click');
};

Editor.prototype.Ajax=function(){
    var self=this;
    var tables=new TableAjax();
    return tables.write().then(function(data){
        self.tables=data;
    })
};

module.exports=Editor;