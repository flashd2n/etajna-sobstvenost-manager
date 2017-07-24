class ControllersFactory {
    constructor(controllers, data, logger) {
        this.controllers = controllers;
        this.data = data;
        this.logger = logger;
    }

    getErrorController() {
        return new this.controllers.ErrorController(this.logger);
    }

    getPublicController() {
        return new this.controllers.PublicController(this.data);
    }

    getAdminController() {
        return new this.controllers.AdminController(this.data);
    }

    getAuthController() {

    }

    getApartmentController() {

    }
}

module.exports = ControllersFactory;
