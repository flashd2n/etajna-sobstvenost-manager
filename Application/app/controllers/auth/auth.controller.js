const Request = require('../../models/request.model');
const sha256 = require('sha256');

class AuthController {
    constructor(data) {
        this.data = data;
    }

    getForm(req, res) {
        this.data.apartments.getUnregistered()
            .then((unregisteredAppartments) => {
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

    verifyLoggedUser(req, res, next) {
        if (!req.user) {
            const msg = 'You need to be logged in to access this page.';
            const error = { message: msg, code: 401 };
            return next(new Error(JSON.stringify(error)));
        }
        return next();
    }

    verifyLoggedAdmin(req, res, next) {
        if (!req.user || req.user.type !== 'admin') {
            const msg = 'You need to be an Admin to access this page.';
            const error = { message: msg, code: 401 };
            return next(new Error(JSON.stringify(error)));
        }
        return next();
    }
}

module.exports = AuthController;
