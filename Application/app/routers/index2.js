const attachTo = (app, data) => {
    const routers = [
        require('./api.router.js'),
        require('./web.router'),
    ];

    for (const router of routers) {
        router.attachTo(app, data);
    }
};

module.exports = { attachTo };
