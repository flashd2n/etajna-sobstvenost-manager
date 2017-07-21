class AdminController {
    constructor(data) {
        this.data = data;
    }

    admin(req, res) {
        this.data.registrationRequests.getAll()
            .then((registrationRequests) => {
                res.render('admin', {
                    loggedUser: req.user,
                    registrationRequests,
                });
            });
    }

    createExpense(req, res) {
        res.render('create_expense', { loggedUser: req.user });
    }

    approveExpense(req, res) {
        req.flash('info', 'Registration approved!');
        this.data.registrationRequests.getById(req.params.request_id)
            .then((request) => {
                this.data.appartments.setUsernameAndPassword(
                    request.appartmentId,
                    request.username,
                    request.passwordHash);

                this.data.registrationRequests
                    .deleteByAppartmentId(request.appartmentId);
                this.admin(req, res);
            });
    }

    rejectExpense(req, res) {
        req.flash('info', 'Registration rejected!');
        this.data.registrationRequests.deleteById(req.params.request_id)
            .then(() => {
                this.admin(req, res);
            });
    }
}

module.exports = { AdminController };
