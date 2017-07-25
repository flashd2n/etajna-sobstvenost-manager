class PublicController {
    constructor(data) {
        this.data = data;
    }

    home(req, res) {
        res.render('home', { loggedUser: req.user });
    }

    pageOfShame(req, res) {
        res.render('page_of_shame');
    }

    unpaidAppartmentExpenses(req, res) {
        res.render('unpaid_appartment_expenses',
            { appartmentId: req.params.appartmentId });
    }

    currentExpenses(req, res) {
        res.render('current_expenses', { loggedUser: req.user });
    }

    currentExpense(req, res) {
        res.render('current_expense', {
            loggedUser: req.user,
            expenseId: req.params.expenseId,
        });
    }
}

module.exports = PublicController;
