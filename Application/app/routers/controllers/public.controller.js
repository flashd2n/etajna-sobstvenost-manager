class PublicController {
    constructor(data) {
        this.data = data;
    }

    home(req, res) {
        res.render('home');
    }

    pageOfShame(req, res) {
        res.render('page_of_shame');
    }

    unpaidAppartmentExpenses(req, res) {
        res.render('unpaid_appartment_expenses',
            { appartmentId: req.params.appartmentId });
    }

    currentExpenses(req, res) {
        res.render('current_expenses');
    }

    currentExpense(req, res) {
        res.render('current_expense',
            { expenseId: req.params.expenseId });
    }

    signUp(req, res) {
        res.render('sign_up');
    }

    login(req, res) {
        res.render('login');
    }
}

module.exports = { PublicController };
