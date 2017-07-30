/* globals SystemJS */

SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        // system js files
        'plugin-babel': '/libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build':
            '/libs/systemjs-plugin-babel/systemjs-babel-browser.js',

        // app files
        'home': '/public/scripts/home.js',
        'chat': '/public/scripts/chat.client.js',
        'myapartment': '/public/scripts/my.apartment.js',
        'pageofshame': '/public/scripts/page.of.shame.js',
        'admin': '/public/scripts/admin.js',
        'createExpense': '/public/scripts/create.expense.js',
        'login': '/public/scripts/login.js',
        'register': '/public/scripts/register.js',
    },
});
