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

    register(req, res) {
        this.data.appartments.getUnregistered()
            .then((unregisteredAppartments) => {
                res.render('register', {
                    loggedUser: req.user,
                    unregisteredAppartments,
                });
            });
    }

    doRegister(req, res) {
        this.data.requests.getByUsername(req.body.username)
            .then((registrationRequest) => {
                if (registrationRequest) {
                    req.flash('error', 'Username already exists');
                    this.register(req, res);
                    return Promise.reject();
                }

                return this.data.appartments.getByUsername(req.body.username);
            })
            .then((appartment) => {
                if (appartment) {
                    req.flash('error', 'Username already exists');
                    this.register(req, res);
                    return Promise.reject();
                }

                return this.data.manager.getUsername();
            })
            .then((username) => {
                if (username === req.body.username) {
                    req.flash('error', 'Username already exists');
                    this.register(req, res);
                    return Promise.reject();
                }

                return this.data.appartments.getById(req.body.appartment_id);
            })
            .then((appartment) => {
                const newRegistrationRequest = new Request();
                newRegistrationRequest.appartmentId = req.body.appartment_id;
                newRegistrationRequest
                    .appartmentNameOrNumber = appartment.appartmentNameOrNumber;
                newRegistrationRequest.username = req.body.username;
                newRegistrationRequest.passwordHash = sha256(req.body.password);
                this.data.registrationRequests.create(newRegistrationRequest);
                req.flash('info', 'Thanks for registering. '
                    + 'You will be able to login once the manager '
                    + 'has approved your request.');
                res.redirect(303, '/');

                return Promise.resolve();
            });
    }

    login(req, res) {
        res.render('login', { loggedUser: req.user });
    }
}

module.exports = PublicController;
