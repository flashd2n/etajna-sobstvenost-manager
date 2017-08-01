/* eslint-disable max-len */
const { expect } = require('chai');
const ControllerFactory = require('../../../../utils/factories/controller.factory');

describe('Controller Facotory Tests', () => {
    const controllers = {
        ErrorController: class ErrorController { },
        PublicController: class PublicController { },
        AdminController: class AdminController { },
        AuthController: class AuthController { },
        ApartmentController: class ApartmentController { },
        ApiController: class ApiController { },
        ValidatorController: class ValidatorController { },
    };
    const data = {};
    const logger = {};
    const factory = new ControllerFactory(controllers, data, logger);

    it('getErrorController should return an error controller object', () => {
        const result = factory.getErrorController();
        expect(result.constructor.name).to.equal('ErrorController');
    });
    it('getPublicController should return an error controller object', () => {
        const result = factory.getPublicController();
        expect(result.constructor.name).to.equal('PublicController');
    });
    it('getAdminController should return an error controller object', () => {
        const result = factory.getAdminController();
        expect(result.constructor.name).to.equal('AdminController');
    });
    it('getAuthController should return an error controller object', () => {
        const result = factory.getAuthController();
        expect(result.constructor.name).to.equal('AuthController');
    });
    it('getApartmentController should return an error controller object', () => {
        const result = factory.getApartmentController();
        expect(result.constructor.name).to.equal('ApartmentController');
    });
    it('getApiController should return an error controller object', () => {
        const result = factory.getApiController();
        expect(result.constructor.name).to.equal('ApiController');
    });
    it('getValidatorController should return an error controller object', () => {
        const result = factory.getValidatorController();
        expect(result.constructor.name).to.equal('ValidatorController');
    });
});
