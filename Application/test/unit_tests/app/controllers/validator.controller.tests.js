/* eslint-disable max-len */

const { expect } = require('chai');
const sinon = require('sinon');
const ValidatorController = require('../../../../app/controllers/validators/validator.controller');

describe('Validator Controller Tests', () => {
    let req = null;
    let res = null;
    let next = null;
    let controller = null;

    beforeEach(() => {
        req = {
            body: {
                appartment_id: '597f599ece471b28a49d7ed5',
                username: 'gosho',
                password: '1234',
                name: 'pesho',
                description: 'awesome',
                cost: '42',
                month: '8',
                year: '2017',
                fee: '50',
                feeId: '597f599ece471b28a49d7ed5',
                expenseId: '597f599ece471b28a49d7ed5',
            },
            params: {
                aptId: '597f599ece471b28a49d7ed5',
            },
        };

        res = {};

        next = sinon.stub();

        controller = new ValidatorController();
    });

    describe('validateRegister tests', () => {
        it('Should call next with not args when all is valid', () => {
            controller.validateRegister(req, res, next);
            expect(next.callCount).to.equal(1);
            expect(next.calledWith()).to.equal(true);
        });

        it('Should call next with error when invalid args', () => {
            req = {
                body: {
                    appartment_id: '57f599ece471b28a49d7ed5',
                    username: 'gosho',
                    password: '1234',
                },
            };
            controller.validateRegister(req, res, next);
            const message = next.getCall(0).args[0].message;
            expect(next.callCount).to.equal(1);
            expect(message).to.equal('Invalid register crendentials');
        });
    });

    describe('validateLogin tests', () => {
        it('Should call next with not args when all is valid', () => {
            controller.validateLogin(req, res, next);
            expect(next.callCount).to.equal(1);
            expect(next.calledWith()).to.equal(true);
        });

        it('Should call next with error when invalid args', () => {
            req = {
                body: {
                    username: '',
                    password: '1234',
                },
            };
            controller.validateLogin(req, res, next);
            const message = next.getCall(0).args[0].message;
            expect(next.callCount).to.equal(1);
            expect(message).to.equal('Invalid login crendentials');
        });
    });

    describe('validateExpense tests', () => {
        it('Should call next with not args when all is valid', () => {
            controller.validateExpense(req, res, next);
            expect(next.callCount).to.equal(1);
            expect(next.calledWith()).to.equal(true);
        });

        it('Should call next with error when invalid args', () => {
            req = {
                body: {
                    name: 'pesho',
                    description: 'awesome',
                    cost: '42a',
                },
            };
            controller.validateExpense(req, res, next);
            const message = next.getCall(0).args[0].message;
            expect(next.callCount).to.equal(1);
            expect(message).to.equal('Invalid expense parameters');
        });
    });

    describe('validateFee tests', () => {
        it('Should call next with not args when all is valid', () => {
            controller.validateFee(req, res, next);
            expect(next.callCount).to.equal(1);
            expect(next.calledWith()).to.equal(true);
        });

        it('Should call next with error when invalid args', () => {
            req = {
                body: {
                    month: '8',
                    year: '2017',
                    fee: '5a0',
                },
            };
            controller.validateFee(req, res, next);
            const message = next.getCall(0).args[0].message;
            expect(next.callCount).to.equal(1);
            expect(message).to.equal('Invalid fee parameters');
        });
    });

    describe('validatePayFee tests', () => {
        it('Should call next with not args when all is valid', () => {
            controller.validatePayFee(req, res, next);
            expect(next.callCount).to.equal(1);
            expect(next.calledWith()).to.equal(true);
        });

        it('Should call next with error when invalid args', () => {
            req = {
                body: {
                    feeId: '597f599ece471b28a49d7ed5',
                },
                params: {
                    aptId: '597f599ece471b28a49ded5',
                },
            };
            controller.validatePayFee(req, res, next);
            const message = next.getCall(0).args[0].message;
            expect(next.callCount).to.equal(1);
            expect(message).to.equal('Invalid fee payment parameters');
        });
    });

    describe('validatePayExpense tests', () => {
        it('Should call next with not args when all is valid', () => {
            controller.validatePayExpense(req, res, next);
            expect(next.callCount).to.equal(1);
            expect(next.calledWith()).to.equal(true);
        });

        it('Should call next with error when invalid args', () => {
            req = {
                body: {
                    expenseId: '597f599ece471b28a49d7ed5',
                },
                params: {
                    aptId: '597f599ece471b28a49ded5',
                },
            };
            controller.validatePayExpense(req, res, next);
            const message = next.getCall(0).args[0].message;
            expect(next.callCount).to.equal(1);
            expect(message).to.equal('Invalid expense payment parameters');
        });
    });
});
