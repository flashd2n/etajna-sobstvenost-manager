const Expense = require('../../models/expense.model');
const { ObjectId } = require('mongodb');

class AdminController {
    constructor(data) {
        this.data = data;
    }

    renderPage(req, res) {
        Promise.all([
            this.data.requests.getAll(),
            this.data.expenses.getPendingExpenses(),
            this.data.expenses.getCompletedExpenses(),
            this.data.expenses.getCanceledExpenses()])
            .then(([requests,
                pendingExpenses,
                completedExpenses,
                canceledExpenses]) => {
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

                res.render('admin', {
                    loggedUser: req.user,
                    requests,
                    pendingExpenses: renderPendingExpenses,
                    completedExpenses: renderCompletedExpenses,
                    canceledExpenses: renderCanceledExpenses,
                });
            });
    }

    completeExpense(req, res) {
        this.data.expenses.completeExpense(req.params.expense_id)
            .then((result) => {
                if (result.modifiedCount > 0) {
                    this.data.apartments.completeExpense(req.params.expense_id);
                    req.flash('info', 'Expense completed!');
                } else {
                    req.flash('error', 'Expense completion failed!');
                    console.error(
                        `The expense with id of `
                        + `${req.params.expense_id} failed to update`);
                }

                res.redirect(303, '/admin');
            });
    }

    cancelExpense(req, res) {
        this.data.expenses.cancelExpense(req.params.expense_id)
            .then((result) => {
                if (result.modifiedCount > 0) {
                    this.data.apartments.cancelExpense(req.params.expense_id);
                    req.flash('info', 'Expense canceled!');
                } else {
                    req.flash('error', 'Expense cancelation failed!');
                    console.error(
                        `The expense with id of `
                        + `${req.params.expense_id} failed to update`);
                }

                res.redirect(303, '/admin');
            });
    }

    renderCreateExpenseForm(req, res) {
        res.render('create_expense', { loggedUser: req.user });
    }

    createExpense(req, res) {
        const newExpense = new Expense();
        newExpense.name = '' + req.body.name;
        newExpense.description = '' + req.body.description;
        newExpense.cost = +req.body.cost;
        newExpense.state = 'pending';
        newExpense.paid = [];
        newExpense.notPaid = [];
        let expenseForApartment;

        this.data.expenses.create(newExpense)
            .then((createdExpense) => {
                newExpense._id = new ObjectId(createdExpense._id);
                expenseForApartment = {
                    _id: new ObjectId(createdExpense._id),
                    name: createdExpense.name,
                    description: createdExpense.description,
                    cost: createdExpense.cost,
                    state: createdExpense.state,
                };

                return this.data.apartments.getAll();
            })
            .then((apartments) => {
                apartments.forEach((apartment) => {
                    const notPaidApartment = {
                        _id: new ObjectId(apartment._id),
                        number: apartment.number,
                        username: apartment.username,
                        moveInDate: apartment.moveInDate,
                    };

                    newExpense.notPaid.push(notPaidApartment);
                    apartment.notPaidExpenses.push(expenseForApartment);
                    this.data.apartments.updateById(apartment._id, apartment);
                });

                this.data.expenses.updateById(newExpense._id, newExpense);

                res.redirect(303, '/admin');
            });
    }

    approveRequest(req, res) {
        this.data.requests.getById(req.params.request_id)
            .then((request) => {
                this.data.apartments.setUsernameAndPassword(
                    request.number,
                    request.username,
                    request.password);

                this.data.requests
                    .deleteByAppartmentId(request.apartmentId);
                req.flash('info', 'Registration approved!');
                res.redirect(303, '/admin');
            })
            .catch(() => {
                req.flash('Error', 'Registration approval failed!');
                console.error(
                    `Registration request with with id of `
                    + `${req.params.request_id} not found!`);
                res.redirect(303, '/admin');
            });
    }

    rejectRequest(req, res) {
        req.flash('info', 'Registration rejected!');
        this.data.requests.deleteById(req.params.request_id)
            .then(() => {
                res.redirect(303, '/admin');
            });
    }
}

module.exports = AdminController;
