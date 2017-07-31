/* eslint-disable max-len */

const { expect } = require('chai');
const sinon = require('sinon');
const AuthController = require('../../../../app/controllers/auth/auth.controller');

describe('Auth Controller Tests', () => {
    let data = null;
    let req = null;
    let res = null;
    let controller = null;
    let next = null;

    const apartments = [];
    const apartment = {
        number: 42,
    };

    beforeEach(() => {
        req = {
            user: {
                type: 'admin',
            },
            body: {
                username: 'gosho',
                appartment_id: '42',
                password: '1234',
            },
            flash: sinon.stub(),
        };

        res = {
            render: sinon.stub(),
            redirect: sinon.stub(),
        };

        next = sinon.stub();

        data = {
            apartments: {
                getUnregistered: sinon.stub().returns(Promise.resolve(apartments)),
                getByUsername: sinon.stub().returns(Promise.resolve()),
                getById: sinon.stub().returns(Promise.resolve(apartment)),
            },
            requests: {
                getByUsername: sinon.stub().returns(Promise.resolve()),
                create: sinon.stub(),
            },
            admin: {
                getUsername: sinon.stub().returns(Promise.resolve('pesho')),
            },
        };

        controller = new AuthController(data);
    });

    describe('getForm Tests', () => {
        it('Should call render when getUnregistered resolves', () => {
            Promise.resolve()
                .then(() => {
                    controller.getForm(req, res);
                    return;
                })
                .then(() => {
                    expect(res.render.callCount).to.equal(1);
                });
        });
    });

    describe('register Tests', () => {
        it('Should call redirect with correct args when registration is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.register(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(res.redirect.callCount).to.equal(1);
                    expect(res.redirect.calledWith(303, '/')).to.equal(true);
                    done();
                });
        });

        it('Should call next when the username exists in the requests', (done) => {
            data = {
                apartments: {
                    getUnregistered: sinon.stub().returns(Promise.resolve(apartments)),
                    getByUsername: sinon.stub().returns(Promise.resolve()),
                    getById: sinon.stub().returns(Promise.resolve(apartment)),
                },
                requests: {
                    getByUsername: sinon.stub().returns(Promise.resolve('something')),
                    create: sinon.stub(),
                },
                admin: {
                    getUsername: sinon.stub().returns(Promise.resolve('pesho')),
                },
            };
            controller = new AuthController(data);
            Promise.resolve()
                .then(() => {
                    controller.register(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    expect(next.callCount).to.equal(1);
                    done();
                });
        });

        it('Should call next when the username exists in the apartments', (done) => {
            data = {
                apartments: {
                    getUnregistered: sinon.stub().returns(Promise.resolve(apartments)),
                    getByUsername: sinon.stub().returns(Promise.resolve('something')),
                    getById: sinon.stub().returns(Promise.resolve(apartment)),
                },
                requests: {
                    getByUsername: sinon.stub().returns(Promise.resolve()),
                    create: sinon.stub(),
                },
                admin: {
                    getUsername: sinon.stub().returns(Promise.resolve('pesho')),
                },
            };
            controller = new AuthController(data);
            Promise.resolve()
                .then(() => {
                    controller.register(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    expect(next.callCount).to.equal(1);
                    done();
                });
        });

        it('Should call next when the username matches the admin username', (done) => {
            data = {
                apartments: {
                    getUnregistered: sinon.stub().returns(Promise.resolve(apartments)),
                    getByUsername: sinon.stub().returns(Promise.resolve()),
                    getById: sinon.stub().returns(Promise.resolve(apartment)),
                },
                requests: {
                    getByUsername: sinon.stub().returns(Promise.resolve()),
                    create: sinon.stub(),
                },
                admin: {
                    getUsername: sinon.stub().returns(Promise.resolve('gosho')),
                },
            };
            controller = new AuthController(data);
            Promise.resolve()
                .then(() => {
                    controller.register(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    expect(next.callCount).to.equal(1);
                    done();
                });
        });
    });

    describe('login Tests', () => {
        it('Should call res.render with correct args', () => {
            const expectedRender = { loggedUser: req.user, page: 'login' };
            controller.login(req, res);
            expect(res.render.callCount).to.equal(1);
            expect(res.render.calledWith('login', expectedRender)).to.equal(true);
        });
    });

    describe('verifyLoggedUser Tests', () => {
        it('Should call next with no args when logged', () => {
            controller.verifyLoggedUser(req, res, next);
            expect(next.calledWith()).to.equal(true);
        });

        it('Should call next with correct error when not logged', () => {
            req = {};
            const msg = 'You need to be logged in to access this page.';
            const error = { message: msg, code: 401 };
            const expectedError = JSON.stringify(error);

            controller.verifyLoggedUser(req, res, next);

            const args = next.getCall(0).args[0];
            expect(args.message).to.deep.equal(expectedError);
        });
    });

    describe('verifyLoggedAdmin Tests', () => {
        it('Should call next with no args when logged admin', () => {
            controller.verifyLoggedAdmin(req, res, next);
            expect(next.calledWith()).to.equal(true);
        });

        it('Should call next with correct error when not logged', () => {
            req = {};
            const msg = 'You need to be an Admin to access this page.';
            const error = { message: msg, code: 401 };
            const expectedError = JSON.stringify(error);

            controller.verifyLoggedAdmin(req, res, next);

            const args = next.getCall(0).args[0];
            expect(args.message).to.deep.equal(expectedError);
        });

        it('Should call next with correct error when logged, but not admin', () => {
            req = {
                user: {
                    type: 'apartment',
                },
            };
            const msg = 'You need to be an Admin to access this page.';
            const error = { message: msg, code: 401 };
            const expectedError = JSON.stringify(error);

            controller.verifyLoggedAdmin(req, res, next);

            const args = next.getCall(0).args[0];
            expect(args.message).to.deep.equal(expectedError);
        });
    });
});
