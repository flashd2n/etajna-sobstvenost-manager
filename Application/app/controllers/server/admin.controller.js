class AdminController {
    constructor(data) {
        this.data = data;
    }

    admin(req, res) {
        this.data.requests.getAll()
            .then((requests) => {
                res.render('admin', {
                    loggedUser: req.user,
                    requests,
                });
            });
    }

    createExpense(req, res) {
        res.render('create_expense', { loggedUser: req.user });
    }

    approveRequest(req, res) {
        req.flash('info', 'Registration approved!');
        this.data.requests.getById(req.params.request_id)
            .then((request) => {
                this.data.apartments.setUsernameAndPassword(
                    request.number,
                    request.username,
                    request.password);

                this.data.requests
                    .deleteByAppartmentId(request.apartmentId);
                this.admin(req, res);
            });
    }

    rejectRequest(req, res) {
        req.flash('info', 'Registration rejected!');
        this.data.requests.deleteById(req.params.request_id)
            .then(() => {
                this.admin(req, res);
            });
    }
}

module.exports = AdminController;
