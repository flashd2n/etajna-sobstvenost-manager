class PublicController {
    constructor(data) {
        this.data = data;
    }

    home(req, res) {
        res.render('home', { loggedUser: req.user });
    }

    pageOfShame(req, res) {
        this.data.apartments.getPOSApartments()
            .then((POSApartments) => {
                res.render('page_of_shame', {
                    POSApartments,
                });
            });
    }

    notPaidApartmentExpenses(req, res) {
        this.data.apartments.getById(req.params.apartmentId)
            .then((currentApartment) => {
                res.render('unpaid_apartment_expenses', {
                    currentApartment,
                });
            });
    }

    allExpenses(req, res, next) {
        Promise.all([this.data.expenses.getPendingExpenses(),
        this.data.expenses.getCompletedExpenses()])
            .then((data) => {
                const pending = data[0];
                const completed = data[1];
                res.render('current_expenses', {
                    loggedUser: req.user,
                    pending: pending,
                    completed: completed,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    currentExpense(req, res, next) {
        const expenseId = req.params.expenseId;
        let totalOccupiedApt = 0;

        this.data.apartments.getUnregistered()
            .then((unRegApt) => {
                totalOccupiedApt = 50 - unRegApt.length;

                return this.data.expenses.getById(expenseId);
            })
            .then((expense) => {
                const collected = this.data.expenses
                    .getCollectedPayments(expense);

                res.render('current_expense', {
                    loggedUser: req.user,
                    expense: expense,
                    collected: collected,
                    totalCost: expense.cost * totalOccupiedApt,
                });
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = PublicController;
