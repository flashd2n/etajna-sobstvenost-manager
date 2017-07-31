/* eslint-disable max-len */

const { expect } = require('chai');
const sinon = require('sinon');
const ApartmentController = require('../../../../app/controllers/server/apartment.controller');

describe('Apartment Controller Tests', () => {
    let req = null;
    let res = null;
    let next = null;
    let data = null;
    let controller = null;
    const apt = {};

    beforeEach(() => {
        req = {
            user: {},
            params: {
                id: 42,
            },
        };

        res = {
            render: sinon.stub(),
        };

        next = sinon.stub();

        data = {
            apartments: {
                getById: sinon.stub().returns(Promise.resolve(apt)),
            },
        };

        controller = new ApartmentController(data);
    });

    describe('renderMyApt tests', () => {
        it('Should call render with correct args when valid apartment id', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.renderMyApt(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(res.render.callCount).to.equal(1);
                    expect(res.render.calledWith('my_apartment', {
                        loggedUser: req.user,
                        page: 'apartment',
                    })).to.equal(true);
                    done();
                });
        });

        it('Should call next with correct error when invalid apartment id', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApartmentController(data);
            Promise.resolve()
                .then(() => {
                    controller.renderMyApt(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    const message = next.getCall(0).args[0].message;
                    expect(next.callCount).to.equal(1);
                    expect(message).to.equal('Invalid apartment id!');
                    done();
                });
        });

        it('Should call next with correct error when getById rejects', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.reject('Something')),
                },
            };
            controller = new ApartmentController(data);
            Promise.resolve()
                .then(() => {
                    controller.renderMyApt(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    const message = next.getCall(0).args[0].message;
                    expect(next.callCount).to.equal(1);
                    expect(message).to.equal('Something');
                    done();
                });
        });
    });

    describe('renderChat tests', () => {
        it('Should call render with correct arguments', () => {
            controller.renderChat(req, res);
            expect(res.render.callCount).to.equal(1);
            expect(res.render.calledWith('chat', { loggedUser: req.user })).to.equal(true);
        });
    });
});
