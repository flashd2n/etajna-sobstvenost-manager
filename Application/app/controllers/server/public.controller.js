class PublicController {
    constructor(data) {
        this.data = data;
    }

    home(req, res) {
        res.render('home', { loggedUser: req.user });
    }

    pageOfShame(req, res) {
        // console.log(this.data.apartments.getPOSApartments);
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
