var router = require('./Router');
require('./newStyle.css');
var user=require('./server/user');
router.pages.auth = require('./pages/auth');
router.pages.table = require('./pages/table');
router.pages.client=require('./pages/client');
router.pages.performer=require('./pages/performer');
router.pages.editor=require('./pages/editor');
router.pages.application=require('./pages/application');
router.pages.comment=require('./pages/comment');
router.pages.assignperformer=require('./pages/assignperformer');
var users=new user();
 users.write().then(function (data) {
    if (data.length!=0){
        router.goto('auth')
    }
    else users.read("admin","admin").then(function () {
         router.goto('auth')
     })
    }
);