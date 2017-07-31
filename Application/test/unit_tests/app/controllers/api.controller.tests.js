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

    const apt = {
        notPaidFees: [],
        notPaidExpenses: [],
    };
    const apartments = [];
    const expenses = [];

    beforeEach(() => {
        data = {
            apartments: {
                getById: sinon.stub().returns(Promise.resolve(apt)),
                getByIdWithPass: sinon.stub().returns(Promise.resolve(apt)),
                processFeePayment: sinon.stub().returns(Promise.resolve()),
                processExpensePayment: sinon.stub().returns(Promise.resolve()),
                getPOSApartments: sinon.stub().returns(Promise.resolve(apartments)),
                deleteApartment: sinon.stub().returns(Promise.resolve(42)),
            },
            fees: {
                processAptPayment: sinon.stub().returns(Promise.resolve('Success')),
                removeAptFromNotPaid: sinon.stub().returns(Promise.resolve()),
            },
            expenses: {
                processAptPayment: sinon.stub().returns(Promise.resolve('Success')),
                getPendingExpenses: sinon.stub().returns(Promise.resolve(expenses)),
                removeAptFromNotPaid: sinon.stub().returns(Promise.resolve()),
            },
        };

        req = {
            user: {
                username: 'Gosho',
            },
            params: {
                id: 42,
                aptId: 42,
                aptNum: 42,
            },
            body: {
                feeId: 42,
                expenseId: 42,
            },
        };

        res = {
            json: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub(),
            }),
            send: sinon.stub(),
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
        it('Should call res.send once with Success message when everything is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.payFee(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(res.send.callCount).to.equal(1);
                    expect(res.send.calledWith('Success')).to.equal(true);
                    done();
                });
        });

        it('Should call processFeePayment once with correct args', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.payFee(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(data.apartments.processFeePayment.callCount).to.equal(1);
                    expect(data.apartments.processFeePayment.calledWith(apt, 42)).to.equal(true);
                    done();
                });
        });

        it('Should call processAptPayment once with correct args', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.payFee(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(data.fees.processAptPayment.callCount).to.equal(1);
                    expect(data.fees.processAptPayment.calledWith(apt, 42)).to.equal(true);
                    done();
                });
        });

        it('Should call res.send once with Fail message when invalid apartment id', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve(apt)),
                    getByIdWithPass: sinon.stub().returns(Promise.reject()),
                    processFeePayment: sinon.stub().returns(Promise.resolve()),
                },
                fees: {
                    processAptPayment: sinon.stub().returns(Promise.resolve('Success')),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.payFee(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    expect(res.status().send.callCount).to.equal(1);
                    expect(res.status().send.calledWith('Fail')).to.equal(true);
                    done();
                });
        });

        it('Should call res.send once with Fail message when no success from processAptPayment', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve(apt)),
                    getByIdWithPass: sinon.stub().returns(Promise.resolve(apt)),
                    processFeePayment: sinon.stub().returns(Promise.resolve()),
                },
                fees: {
                    processAptPayment: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.payFee(req, res, next);
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
                    expect(res.status().send.callCount).to.equal(1);
                    expect(res.status().send.calledWith('Fail')).to.equal(true);
                    done();
                });
        });
    });

    describe('payExpense tests', () => {
        it('Should call res.send once with Success message when everything is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.payExpense(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(res.send.callCount).to.equal(1);
                    expect(res.send.calledWith('Success')).to.equal(true);
                    done();
                });
        });

        it('Should call processFeePayment once with correct args', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.payExpense(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(data.apartments.processExpensePayment.callCount).to.equal(1);
                    expect(data.apartments.processExpensePayment.calledWith(apt, 42)).to.equal(true);
                    done();
                });
        });

        it('Should call processAptPayment once with correct args', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.payExpense(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(data.expenses.processAptPayment.callCount).to.equal(1);
                    expect(data.expenses.processAptPayment.calledWith(apt, 42)).to.equal(true);
                    done();
                });
        });

        it('Should call res.send once with Fail message when invalid apartment id', (done) => {
            data = {
                apartments: {
                    getByIdWithPass: sinon.stub().returns(Promise.reject()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.payExpense(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    expect(res.status().send.callCount).to.equal(1);
                    expect(res.status().send.calledWith('Fail')).to.equal(true);
                    done();
                });
        });

        it('Should call res.send once with Fail message when no success from processAptPayment', (done) => {
            data = {
                apartments: {
                    getById: sinon.stub().returns(Promise.resolve(apt)),
                    getByIdWithPass: sinon.stub().returns(Promise.resolve(apt)),
                    processExpensePayment: sinon.stub().returns(Promise.resolve()),
                },
                expenses: {
                    processAptPayment: sinon.stub().returns(Promise.resolve()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.payExpense(req, res, next);
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
                    expect(res.status().send.callCount).to.equal(1);
                    expect(res.status().send.calledWith('Fail')).to.equal(true);
                    done();
                });
        });
    });

    describe('getAllDebtors tests', () => {
        it('Should call res.json once with correct args when everything is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.getAllDebtors(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.json.callCount).to.equal(1);
                    expect(res.json.calledWith(apartments)).to.equal(true);
                    done();
                });
        });

        it('Should call res.status with 404 when getPOSApartments rejects', (done) => {
            data = {
                apartments: {
                    getPOSApartments: sinon.stub().returns(Promise.reject()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getAllDebtors(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    expect(res.status.calledWith(404)).to.equal(true);
                    done();
                });
        });
    });

    describe('getCurrentExpenses tests', () => {
        it('Should call res.json once with correct args when everything is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.getCurrentExpenses(req, res, next);
                    return;
                })
                .then(() => {
                    expect(res.json.callCount).to.equal(1);
                    expect(res.json.calledWith(expenses)).to.equal(true);
                    done();
                });
        });

        it('Should call res.status with 404 when getPendingExpenses rejects', (done) => {
            data = {
                expenses: {
                    getPendingExpenses: sinon.stub().returns(Promise.reject()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.getCurrentExpenses(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    expect(res.status.calledWith(404)).to.equal(true);
                    done();
                });
        });
    });

    describe('removeApt tests', () => {
        it('Should call res.send once with Success message when everything is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.removeApt(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(res.send.callCount).to.equal(1);
                    expect(res.send.calledWith('Success')).to.equal(true);
                    done();
                });
        });

        it('Should call removeAptFromNotPaid once with correct args', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.removeApt(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(data.expenses.removeAptFromNotPaid.callCount).to.equal(1);
                    expect(data.expenses.removeAptFromNotPaid.calledWith(42)).to.equal(true);
                    done();
                });
        });

        it('Should call removeAptFromNotPaid once with correct args', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.removeApt(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(data.fees.removeAptFromNotPaid.callCount).to.equal(1);
                    expect(data.fees.removeAptFromNotPaid.calledWith(42)).to.equal(true);
                    done();
                });
        });

        it('Should call res.send once with Fail message when invalid apartment number', (done) => {
            data = {
                apartments: {
                    deleteApartment: sinon.stub().returns(Promise.reject()),
                },
            };
            controller = new ApiController(data);
            Promise.resolve()
                .then(() => {
                    controller.removeApt(req, res, next);
                    return;
                })
                .then(() => {
                    return Promise.reject();
                })
                .catch(() => {
                    expect(res.status().send.callCount).to.equal(1);
                    expect(res.status().send.calledWith('Fail')).to.equal(true);
                    done();
                });
        });
    });
});
