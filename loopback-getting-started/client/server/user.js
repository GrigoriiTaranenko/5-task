/**
 * Created by Sergey on 19.07.2016.
 */
$=require('jquery');
var UserAjax=function(content){
    this.content=content;
};
UserAjax.prototype.write=function(){
    return $.ajax({
        url: "../api/names"
    }).then(function(data){
        return data;
    });
};
UserAjax.prototype.read=function(name, client) {
    var write = {
        "name": name,
        "role": client
    };
    return $.ajax({
        type: "POST",
        url: "../api/names",
        data: write
    });
};
module.exports= UserAjax;