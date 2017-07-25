const Request = require('../../models/request.model');
const sha256 = require('sha256');

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

    getForm(req, res) {
        this.data.apartments.getUnregistered()
            .then((unregisteredAppartments) => {
                // console.log(unregisteredAppartments);
                res.render('register', {
                    loggedUser: req.user,
                    unregisteredAppartments,
                });
            });
    }

    register(req, res) {
        this.data.requests.getByUsername(req.body.username)
            .then((registrationRequest) => {
                if (registrationRequest) {
                    req.flash('error', 'Username already exists');
                    this.getForm(req, res);
                    return Promise.reject();
                }
                return this.data.apartments.getByUsername(req.body.username);
            })
            .then((apartment) => {
                if (apartment) {
                    req.flash('error', 'Username already exists');
                    this.getForm(req, res);

                    return Promise.reject();
                }

                return this.data.admin.getUsername();
            })
            .then((username) => {
                if (username === req.body.username) {
                    req.flash('error', 'Username already exists');
                    this.getForm(req, res);
                    return Promise.reject();
                }

                return this.data.apartments.getById(req.body.appartment_id);
            })
            .then((apartment) => {
                const newRequest = new Request();
                newRequest.apartmentId = req.body.appartment_id;
                newRequest.number = apartment.number;
                newRequest.username = req.body.username;
                newRequest.password = sha256(req.body.password);

                this.data.requests.create(newRequest);
                req.flash('info', 'Thanks for registering. '
                    + 'You will be able to login once the manager '
                    + 'has approved your request.');
                res.redirect(303, '/');

                return Promise.resolve();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    login(req, res) {
        res.render('login', { loggedUser: req.user });
    }
}

module.exports = PublicController;
