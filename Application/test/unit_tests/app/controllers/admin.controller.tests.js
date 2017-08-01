/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const AdminController = require('../../../../app/controllers/server/admin.controller');

describe('Admin Controller Tests', () => {
    let controller;
    let data;
    let req;
    let body;
    const name = 'expensename';
    const description = 'expensedescription';
    const cost = '666';
    const month = '8';
    const year = '2017';
    const fee = 'fee';
    const requestId = '597fcb4b97ac3f72ddf31d4e';
    let res;
    const loggedUser = { type: 'admin' };
    const requests = [];
    const pendingExpenses = [];
    const completedExpenses = [];
    const canceledExpenses = [];
    const expenseId = 'alabalaportokala';

    const request = {
        number: 1,
        username: 'username',
        password: 'password',
        apartmentId: '597fcb4bkurc3f72ddf31d4e',
    };

    const createdExpense = {
        name: 'name',
        description: 'description',
        cost: 343,
        state: 'pending',
    };

    const insertedExpense = {
        _id: '597fcb4b97ac3f72ddf31d4e',
        name: 'name',
        description: 'description',
        cost: 343,
        state: 'pending',
    };

    beforeEach(() => {
        body = {
            name,
            description,
            cost,
            request_id: requestId,
        };

        req = {
            user: loggedUser,
            params: {
                expense_id: expenseId,
            },
            flash: sinon.stub(),
            body,
        };

        res = {
            render: sinon.stub(),
            redirect: sinon.stub(),
        };

        data = {
            requests: {
                getAll: () => requests,
                getById: sinon.stub().returns(Promise.resolve(request)),
                deleteByAppartmentId: sinon.stub(),
                deleteById: sinon.stub().returns(Promise.resolve()),
            },
            expenses: {
                getPendingExpenses: () => pendingExpenses,
                getCompletedExpenses: () => completedExpenses,
                getCanceledExpenses: () => canceledExpenses,
                completeExpense: sinon.stub(),
                cancelExpense: sinon.stub(),
                create: sinon.stub().returns(Promise.resolve(createdExpense)),
                updateById: sinon.stub().returns(Promise.resolve(insertedExpense._id, insertedExpense)),
            },
            apartments: {
                completeExpense: sinon.stub(),
                cancelExpense: sinon.stub(),
                getRegistered: sinon.stub().returns(Promise.resolve([1])),
                addExpense: sinon.stub(),
                addFee: sinon.stub(),
                setUsernameAndPassword: sinon.stub(),
            },
            fees: {
                create: sinon.stub().returns(Promise.resolve('new_fee')),
                updateById: sinon.stub().returns(Promise.resolve()),
            },
        };

        controller = new AdminController(data);
    });
    describe('renderPage', () => {
        it('renderPage should call res.render with correct params', () => {
            return controller.renderPage(req, res)
                .then(() => {
                    const renderPendingExpenses =
                        pendingExpenses.map((expense) => {
                        expense.paidAmount = expense.paid.length
                            * expense.cost;
                        expense.totalCost =
                            (expense.paid.length
                            + expense.notPaid.length)
                            * expense.cost;
                        return expense;
                    });

                    const renderCompletedExpenses =
                        completedExpenses.map((expense) => {
                        expense.paidAmount = expense.paid.length
                            * expense.cost;
                        expense.totalCost =
                            (expense.paid.length
                            + expense.notPaid.length)
                            * expense.cost;
                        return expense;
                    });

                    const renderCanceledExpenses =
                        canceledExpenses.map((expense) => {
                        expense.paidAmount = expense.paid.length
                            * expense.cost;
                        expense.totalCost =
                            (expense.paid.length
                            + expense.notPaid.length)
                            * expense.cost;
                        return expense;
                    });

                    expect(res.render).to.have.been.calledWith('admin', {
                        loggedUser: req.user,
                        requests,
                        pendingExpenses: renderPendingExpenses,
                        completedExpenses: renderCompletedExpenses,
                        canceledExpenses: renderCanceledExpenses,
                        page: 'admin',
                    });
                });
        });
    });

    describe('completeExpense', () => {
        it('Expect completeExpense to call expenses.completeExpense with passed expense_id', () => {
            data.expenses.completeExpense.returns(Promise.resolve({ modifiedCount: 0 }));

            return controller.completeExpense(req, res)
                .then(() => {
                    expect(data.expenses.completeExpense)
                        .to.have.been.calledWith(expenseId);
                });
        });

        it('Expect completeExpense to call apartments.completeExpense with passed expense_id on success', () => {
            data.expenses.completeExpense.returns(Promise.resolve({ modifiedCount: 1 }));

            return controller.completeExpense(req, res)
                .then(() => {
                    expect(data.apartments.completeExpense)
                        .to.have.been.calledWith(expenseId);
                });
        });

        it('Expect completeExpense to call req.flash with appropriate params on success', () => {
            data.expenses.completeExpense.returns(Promise.resolve({ modifiedCount: 1 }));

            return controller.completeExpense(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('info', 'Expense completed!');
                });
        });

        it('Expect completeExpense to call req.flash with appropriate params on failure', () => {
            data.expenses.completeExpense.returns(Promise.resolve({ modifiedCount: 0 }));

            return controller.completeExpense(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('error', 'Expense completion failed!');
                });
        });

        it('Expect completeExpense credirect to /admin to be called ', () => {
            data.expenses.completeExpense.returns(Promise.resolve({ modifiedCount: 0 }));

            return controller.completeExpense(req, res)
                .then(() => {
                    expect(res.redirect)
                        .to.have.been.calledWith(303, '/admin');
                });
        });
    });

    describe('cancelExpense', () => {
        it('Expect cancelExpense to call expenses.cancelExpense with passed expense_id', () => {
            data.expenses.cancelExpense.returns(Promise.resolve({ modifiedCount: 0 }));

            return controller.cancelExpense(req, res)
                .then(() => {
                    expect(data.expenses.cancelExpense)
                        .to.have.been.calledWith(expenseId);
                });
        });

        it('Expect cancelExpense to call apartments.cancelExpense with passed expense_id on success', () => {
            data.expenses.cancelExpense.returns(Promise.resolve({ modifiedCount: 1 }));

            return controller.cancelExpense(req, res)
                .then(() => {
                    expect(data.apartments.cancelExpense)
                        .to.have.been.calledWith(expenseId);
                });
        });

        it('Expect cancelExpense to call req.flash with appropriate params on success', () => {
            data.expenses.cancelExpense.returns(Promise.resolve({ modifiedCount: 1 }));

            return controller.cancelExpense(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('info', 'Expense canceled!');
                });
        });

        it('Expect cancelExpense to call req.flash with appropriate params on failure', () => {
            data.expenses.cancelExpense.returns(Promise.resolve({ modifiedCount: 0 }));

            return controller.cancelExpense(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('error', 'Expense cancelation failed!');
                });
        });

        it('Expect cancelExpense credirect to /admin to be called ', () => {
            data.expenses.cancelExpense.returns(Promise.resolve({ modifiedCount: 0 }));

            return controller.cancelExpense(req, res)
                .then(() => {
                    expect(res.redirect)
                        .to.have.been.calledWith(303, '/admin');
                });
        });
    });

    describe('renderCreateExpenseForm', () => {
        it('Expect renderCreateExpenseForm to call res.render with appropriate arguemnts', () => {
            controller.renderCreateExpenseForm(req, res);

            expect(res.render).to.have.been.calledWith('create_expense',
                { loggedUser: req.user, page: 'admin' });
        });
    });

    describe('createExpense', () => {
        it('Expect expenses.create to be called with passed params', () => {
            return controller.createExpense(req, res)
                .then(() => {
                    const newExpense = {};
                    newExpense.name = '' + req.body.name;
                    newExpense.description = '' + req.body.description;
                    newExpense.cost = +req.body.cost;
                    newExpense.state = 'pending';
                    newExpense.paid = [];
                    newExpense.notPaid = [];

                    expect(data.expenses.create).to.have.been.called;
                });
        });

        it('Expect data.apartments.getRegistered() to be called once', () => {
            return controller.createExpense(req, res)
                .then(() => {
                    expect(data.apartments.getRegistered).to.have.been.called;
                });
        });

        it('Expect data.apartments.addExpense() to be called once', () => {
            return controller.createExpense(req, res)
                .then(() => {
                    expect(data.apartments.addExpense).to.have.been.called;
                });
        });

        it('Expect data.expenses.updateById() to be called once', () => {
            return controller.createExpense(req, res)
                .then(() => {
                    expect(data.expenses.updateById).to.have.been.called;
                });
        });

        it('Expect req.flash to be called with appropriate params on failure', () => {
            return controller.createExpense(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('info', 'Expense created!');
                });
        });

        it('Expect redirect to /admin to be called ', () => {
            return controller.createExpense(req, res)
                .then(() => {
                    expect(res.redirect)
                        .to.have.been.calledWith(303, '/admin');
                });
        });
    });

    describe('addMonthlyFee', () => {
        it('Expect data.fees.create to be called', () => {
            controller.addMonthlyFee(req, res)
                .then(() => {
                    expect(data.fees.create).to.have.been.called;
                });
        });

        it('Expect data.apartments.addFee to be called', () => {
            controller.addMonthlyFee(req, res)
                .then(() => {
                    expect(data.apartments.addFee).to.have.been.called;
                });
        });

        it('Expect data.fees.updateById to be called', () => {
            controller.addMonthlyFee(req, res)
                .then(() => {
                    expect(data.fees.updateById).to.have.been.called;
                });
        });

        it('Expect req.flash to be called with appropriate params on failure', () => {
            return controller.addMonthlyFee(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('info', 'Montly fee created!');
                });
        });

        it('Expect redirect to /admin to be called ', () => {
            return controller.addMonthlyFee(req, res)
                .then(() => {
                    expect(res.redirect)
                        .to.have.been.calledWith(303, '/admin');
                });
        });
    });

    describe('approveRequest', () => {
        it('Expect requests.getById to be called with passed param', () => {
            return controller.approveRequest(req, res)
                .then(() => {
                    expect(data.requests.getById).to.have.been.calledWith(req.params.request_id);
                });
        });

        it('Expect apartments.setUsernameAndPassword to be called with passed param', () => {
            return controller.approveRequest(req, res)
                .then(() => {
                    expect(data.apartments.setUsernameAndPassword).to.have.been
                        .calledWith(request.number, request.username, request.password);
                });
        });

        it('Expect apartments.deleteByAppartmentId to be called with passed param', () => {
            return controller.approveRequest(req, res)
                .then(() => {
                    expect(data.requests.deleteByAppartmentId).to.have.been
                        .calledWith(request.apartmentId);
                });
        });

        it('Expect req.flash to be called with appropriate params on success', () => {
            return controller.approveRequest(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('info', 'Registration approved!');
                });
        });

        it('Expect redirect to /admin to be called ', () => {
            return controller.approveRequest(req, res)
                .then(() => {
                    expect(res.redirect)
                        .to.have.been.calledWith(303, '/admin');
                });
        });

        it('Expect req.flash to be called with appropriate params on failure', () => {
            data.requests.getById.returns(Promise.reject());

            return controller.approveRequest(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('Error', 'Registration approval failed!');
                });
        });

        it('Expect redirect to /admin to be called on faluire', () => {
            data.requests.getById.returns(Promise.reject());

            return controller.approveRequest(req, res)
                .then(() => {
                    expect(res.redirect)
                        .to.have.been.calledWith(303, '/admin');
                });
        });
    });

    describe('rejectRequest', () => {
        it('should flash delete message when called', () => {
            return controller.rejectRequest(req, res)
                .then(() => {
                    expect(req.flash)
                        .to.have.been.calledWith('info', 'Registration rejected!');
                });
        });

        it('should call requests.deleteById with appropriate id', () => {
            return controller.rejectRequest(req, res)
                .then(() => {
                    expect(data.requests.deleteById)
                        .to.have.been.calledWith(req.params.request_id);
                });
        });

        it('should redirect to admin', () => {
            return controller.rejectRequest(req, res)
                .then(() => {
                    expect(res.redirect)
                        .to.have.been.calledWith(303, '/admin');
                });
        });
    });
});
