var router = require('../Router');
var template = require('../templates/table.ejs');
var _=require('lodash');
var UserAjax=require('../server/user');
var TableAjax=require('../server/table');

var Table = function (params) {
    this.user = params.user;
    this.role = params.role;
    this.tables=[];
    this.users=[];
    this.allClient=[{name:"не фильтровать"}];
    this.allClien=[];
    this.taskList = {
        TableWrite:[],
        role:'',
        client:[],
        status:[]
    };
    this.template = template;
    this.events();
};

Table.prototype.events = function () {
    var self=this;
    router.elem.on('click','th', function(event){
        self.sort(event);
    });
    router.elem.on('click','tbody tr', function (event) {
        self.application(event)
    });
    router.elem.on('click','.button', function(){
        self.render()
    });
    router.elem.on('click','#addtr',this.addtr)
};


Table.prototype.render = function () {
    this.taskList={
        TableWrite:this.tables,
        role:this.role,
        client:this.allClient,
        status:this.status
    };
    router.elem.html(this.template(this.getData(this.taskList)));
};

Table.prototype.close = function () {
     router.elem.off('click')
};

Table.prototype.getData = function (data) {
    var status=this.AsseptStatus();
    var client=this.client();
    var search=this.search();
    var sort=this.th;
    if (status && status!="не фильтровать") {
        data.TableWrite=_.filter(data.TableWrite, {"status":status})
        this.swap(data.status,status);
    }
    if (client!="не фильтровать" && client) {
        data.TableWrite=_.filter(data.TableWrite, {"client":client});
    }
    if (search && search!="") {
        data.TableWrite=_.filter(data.TableWrite, function (o) {return o.description.indexOf(search)>-1});
    }
    if (sort && sort.length>0) {
        data.TableWrite=_.sortBy(data.TableWrite,function (o) {
            return o[sort];
        });
    }
    if (data.role!="client" && client)this.swap(data.client,client);
    return data;
};
Table.prototype.addtr=function(){
    router.goto('editor')
};

Table.prototype.application=function(event){
    router.goto('application',{
        table:this.tables[event.currentTarget.dataset.id]
    })
};

Table.ReadUserAjax=function() {
    router.ajax({
        url: "http://localhost:3000/api/names",
        async: false,
        success: function (data) {
            Table.User = data;
        }
    })
};
Table.ReadTableAjax=function(){
    router.ajax({
        url:"http://localhost:3000/api/tables",
        async:false,
        success:function (data) {
            Table.Tables=data
        }
    })
};



Table.prototype.status=[{"name":"не фильтровать"},
    {"name":"online"},
    {"name":"offline"}];





Table.prototype.addcollection=function(client,allClient)
{
    for (var i=0; i<allClient.length; i++) client.push(allClient[i])
    return client;
};

Table.prototype.filterUser=function () {
    if (this.role=='client')
        this.tables= _.filter(this.tables,{"client":this.user});
    else
        this.tables= _.filter(this.tables,{"performer":this.user});
};

Table.prototype.AsseptStatus = function(){
    return router.elem.find('.status').val();
};

Table.prototype.client = function(){
    return router.elem.find('.client').val();
};

Table.prototype.sort = function(e){
    this.th= e.currentTarget.dataset.sort;
};

Table.prototype.search = function(){
    return router.elem.find('.text').val();
};

Table.prototype.swap =function (array, elem) {
    var i=0;
    while (array[i].name!=elem) i++;
    array.splice(i,1);
    array.splice(0,0,{name:elem});
    return array;
};

Table.prototype.Ajax =function(){
    var user=new UserAjax();
    var table=new TableAjax();
    var self=this;
    return user.write()
        .then(function (data) {
            self.users=data;
            self.allClien=_.filter(self.users,{role:"client"});
            self.allClient=self.addcollection(self.allClient,self.allClien);
            return table.write()
        })
        .then(function (data) {
            self.tables = data;
            if (self.role!='admin') self.filterUser();
            return data;
        })
};

module.exports = Table;
