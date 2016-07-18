var router = require('./Router');
require('./newStyle.css');

if (!localStorage.getItem('admin')) localStorage.setItem('admin',JSON.stringify({"role":"admin"}));
if (!localStorage.getItem('!table!')) localStorage.setItem('!table!',JSON.stringify([]));
if (!localStorage.getItem('performer')) localStorage.setItem('performer',JSON.stringify([]));
if (!localStorage.getItem('client')) localStorage.setItem('client',JSON.stringify([]));
if (!localStorage.getItem('status'))
    localStorage.setItem('status',JSON.stringify([{"name":"не фильтровать"},{"name":"online"}, {"name":"offline"}]));
router.pages.auth = require('./pages/auth');
router.pages.table = require('./pages/table');
router.pages.client=require('./pages/client');
router.pages.performer=require('./pages/performer');
router.pages.editor=require('./pages/editor');
router.pages.application=require('./pages/application');
router.pages.comment=require('./pages/comment');
router.pages.assignperformer=require('./pages/assignperformer');
router.goto('auth');
