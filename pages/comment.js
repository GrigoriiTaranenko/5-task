/**
 * Created by Sergey on 17.07.2016.
 */
var router=require("../Router");
var template=require("../templates/comment.ejs");
var Comment = function(params) {
    this.template=template;
    Comment.data = params.data;
    Comment.Table=[];
    Comment.ReadTableAjax();
    Comment.Table=Comment.Table[Comment.data];
    this.events();
};
Comment.prototype.render=function(){
    router.elem.html(template)
};
Comment.prototype.events=function () {
    router.elem.on('click','.AddComment',this.AddComment)
};

Comment.prototype.AddComment=function () {
    var comment=router.elem.find('textarea').val();
    Comment.Table.comment.push(router.user+": "+comment);
    Comment.AssignValue(Comment.Table);
    router.goto('application',{
        data:Comment.data
    })
};


Comment.AssignValue=function(collection){
    console.log(collection);
    router.ajax({
        type:"PATCH",
        url:"http://localhost:3000/api/tables",
        async:false,
        data:collection,
        success:function (data) {
            console.log(data)
        }
    })
};

Comment.ReadTableAjax=function(){
    router.ajax({
        url:"http://localhost:3000/api/tables",
        async:false,
        success:function (data) {
            Comment.Table=data
        }
    })
};
Comment.prototype.close=function(){
    router.elem.off('click')  
};
module.exports=Comment;