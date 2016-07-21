var $ = require('jquery');


var lastPage = {};

var lastParams = {};

var role='';

var Router = {
    pages: {},
    role: 'anonymous',
    user: null,
    elem: $('#app'),
    ajax: $.ajax,
    stack: []
};

Router.goto = function (page, params, back) {
    back = back || false;
    // Если у старой страницы есть метод close()
    if (lastPage && lastPage.close) {
        lastPage.close();
    }
    if (lastParams && back == false) {
        this.stack.push(lastParams);
    }
    lastParams = {
        page: page,
        params: params
    };

    $(document.body).attr('data-page', page);

    lastPage = new this.pages[page](params);
    role=this.role;
    this.elem.html('Загрузка!!!');
    lastPage
        .Ajax()
        .then(function() {
            var header = require('./Header');
            header(page, role);
            lastPage.render();
        });
};

Router.back = function () {
    var back = this.stack.pop();
    this.goto(back.page, back.params, true);
};

module.exports = Router;