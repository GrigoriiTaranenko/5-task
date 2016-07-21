/**
 * Created by Sergey on 19.07.2016.
 */
$=require('jquery');
var TableAjax=function(content){
    this.content=content;
};
TableAjax.prototype.write=function(){
    return $.ajax({
        url: "../api/tables"
    });
};

TableAjax.prototype.readPATCH=function (collection) {
    console.log(collection);
    return $.ajax({
        type:"PATCH",
        url:"../api/tables",
        data:collection
    })
};

TableAjax.prototype.readPOST=function (collection) {
    console.log(collection);
    return $.ajax({
        type:"POST",
        url:"../api/tables",
        data:collection
    })
};


module.exports= TableAjax;