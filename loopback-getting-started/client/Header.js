var template = require('./templates/header.ejs');
var $ = require('jquery');
var router = require('./Router');

var $elem = $('header');

$elem.on('click', '#Exit', function () {
    router.goto('auth');
});

$elem.on('click', '#BBack', function () {
    router.goto('table', {
        user:router.user,
        role:router.role
    }
    );
});
$elem.on('click', '#RC', function(){
    router.goto('client');
});
$elem.on('click', '#RP', function(){
    router.goto('performer')
});

module.exports = function (page, role) {
    $elem.html(template({
        page: page,
        role: role
    }));
};
