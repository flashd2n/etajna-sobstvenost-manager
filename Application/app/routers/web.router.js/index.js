const attachTo = (app, data) => {
     const routers = [
        require('./public.router.js'),
        require('./manager.router.js'),
        require('./appartment.router.js'),
    ];

    for (const router of routers) {
        router.attachTo(app, data);
    }
};

module.exports = { attachTo };
