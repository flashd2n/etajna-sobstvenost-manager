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
        return new this.controllers.AuthController(this.data);
    }

    getApartmentController() {

    }

    getApiController() {
        return new this.controllers.ApiController(this.data);
    }
}

module.exports = ControllersFactory;
