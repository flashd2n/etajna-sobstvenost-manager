/* eslint-disable max-len */

const { expect } = require('chai');
const sinon = require('sinon');
const ErrorController = require('../../../../app/controllers/errors/errors.controller');

describe('Error Controller Tests', () => {
    let logger = null;
    let res = null;
    const req = null;
    const next = null;
    let controller = null;
    let err = null;

    beforeEach(() => {
        logger = {
            log: sinon.stub(),
        };

        res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub(),
                json: sinon.stub(),
            }),
        };

        err = {
            message: '{ "message":"something", "code":"42" }',
        };

        controller = new ErrorController(logger);
    });

    describe('handleError tests', () => {
        it('Should call res.status with 400 and correct message when unrecognized code', () => {
            controller.handleError(err, req, res, next);
            expect(res.status.calledWith(400)).to.equal(true);
            expect(res.status().send.calledWith('Some unexpected error')).to.equal(true);
        });

        it('Should call res.status with 500 and json correct message when code is 500', () => {
            err = {
                message: '{ "message":"something", "code":"500" }',
            };
            controller.handleError(err, req, res, next);
            expect(res.status.calledWith(500)).to.equal(true);
            expect(res.status().json.calledWith(JSON.parse(err.message))).to.equal(true);
        });

        it('Should call res.status with 401 and send correct message when code is 401', () => {
            err = {
                message: '{ "message":"something", "code":"401" }',
            };
            controller.handleError(err, req, res, next);
            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.status().send.calledWith('something')).to.equal(true);
        });

        it('Should call res.status with 401 and send correct message when code is 401', () => {
            err = {
                message: 'something',
            };
            controller.handleError(err, req, res, next);
            expect(res.send.calledWith('something')).to.equal(true);
        });
    });
});
