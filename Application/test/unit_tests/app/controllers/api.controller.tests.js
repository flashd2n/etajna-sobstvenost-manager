/* eslint-disable max-len */

const { expect } = require('chai');
const sinon = require('sinon');
const ApiController = require('../../../../app/controllers/api/api.controller');

describe('Api Controller Tests', () => {
    let data = null;
    let req = null;
    let res = null;
    let next = null;
    let controller = null;

    let apt = {
        notPaidFees: [],
        notPaidExpenses: [],
    };

    beforeEach(() => {
        data = {
            apartments: {
                getById: sinon.stub().returns(Promise.resolve(apt)),
            },
        };

        req = {
            user: {
                username: 'Gosho',
            },
            params: {
                id: 42,
            },
        };

        res = {
            json: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub(),
            }),
        };

        next = sinon.stub();

        controller = new ApiController(data);
    });

    describe('retriveUser tests', () => {
        it('retrieveUser should call next once when no user is attached to req', () => {
            req = {};
            controller.retriveUser(req, res, next);
            expect(next.callCount).to.equal(1);
        });

        it('retrieveUser should call next with correct Error when no user is attached to req', () => {
            req = {};
            const msg = 'No username found!';
            const error = { message: msg, code: 500 };
            const expectedError = JSON.stringify(error);

            controller.retriveUser(req, res, next);

            const args = next.getCall(0).args[0];
            expect(args.message).to.deep.equal(expectedError);
        });

        it('retrieveUser should call res.json once when there is a valid user', () => {
            controller.retriveUser(req, res, next);
            expect(res.json.callCount).to.equal(1);
        });

        it('retrieveUser should call res.json with correct args when there is a valid user', () => {
            controller.retriveUser(req, res, next);
            expect(res.json.calledWith(req.user)).to.equal(true);
        });
    });

    describe('getNotPaidFeesById tests', () => {
        it('Should call res.json once when all data is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidFeesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.json.callCount).to.equal(1);
                    done();
                });
        });

        it('Should call res.json with correct data when all data is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidFeesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.json.calledWith(apt.notPaidFees)).to.equal(true);
                    done();
                });
        });

        it('Should not call res.json when no apartment is found', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidFeesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.json.callCount).to.equal(0);
                    done();
                });
        });

        it('Should call res.status with 404 when no apartment is found', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidFeesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.status.calledWith(404)).to.equal(true);
                    done();
                });
        });

        it('Should call res.status.send with correct message when no apartment is found', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidFeesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.status().send.calledWith('Invalid user id')).to.equal(true);
                    done();
                });
        });

        it('Should call res.status with 404 when promise rejected', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.reject()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidFeesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.status.calledWith(404)).to.equal(true);
                    done();
                })
                .catch((err) => {
                    done();
                });
        });
    });

    describe('getNotPaidExpensesById tests', () => {
        it('Should call res.json once when all data is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidExpensesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.json.callCount).to.equal(1);
                    done();
                });
        });

        it('Should call res.json with correct data when all data is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidExpensesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.json.calledWith(apt.notPaidExpenses)).to.equal(true);
                    done();
                });
        });

        it('Should not call res.json when no apartment is found', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidExpensesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.json.callCount).to.equal(0);
                    done();
                });
        });

        it('Should call res.status with 404 when no apartment is found', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidExpensesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.status.calledWith(404)).to.equal(true);
                    done();
                });
        });

        it('Should call res.status.send with correct message when no apartment is found', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidExpensesById(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.status().send.calledWith('Invalid user id')).to.equal(true);
                    done();
                });
        });

        it('Should call res.status with 404 when promise rejected', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.reject()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getNotPaidExpensesById(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch((err) => {
                    expect(res.status.calledWith(404)).to.equal(true);
                    done();
                });
        });
    });

    describe('payFee tests', () => {
        it('test me', () => {

        });
    });
});
