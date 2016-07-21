/**
 * Created by Sergey on 17.07.2016.
 */
var router=require("../Router");
var template=require("../templates/comment.ejs");
var TableAjax=require("../server/table");
var Comment = function(params) {
    this.template=template;
    this.tables=params.table;
    this.events();
};
Comment.prototype.render=function(){
    router.elem.html(template)
};
Comment.prototype.events=function () {
    var self=this;
    router.elem.on('click','.AddComment',function () {
        self.AddComment()
    })
};

Comment.prototype.AddComment=function () {
    var comment=router.elem.find('textarea').val();
    this.tables.comment.push(router.user+": "+comment);
    this.AssignValue(this.tables);
};


Comment.prototype.AssignValue=function(collection){
    var self=this;
    var table=new TableAjax;
    table.readPATCH(collection).then(function () {
        self.tables=collection;
        router.goto('application',{
            table:self.tables
        })
    })
};
Comment.prototype.Ajax=function () {
    var table=new TableAjax();
    return table.write()
};
Comment.prototype.close=function(){
    router.elem.off('click')  
};
module.exports=Comment;