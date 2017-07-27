class ApiController {
    constructor(data) {
        this.data = data;
    }

    retriveUser(req, res, next) {
        if (!req.user) {
            const msg = 'No username found!';
            const error = { message: msg, code: 500 };
            return next(new Error(JSON.stringify(error)));
        }
        return res.json(req.user);
    }

    getNotPaidFeesById(req, res, next) {
        this.data.apartments.getById(req.params.id)
            .then((apt) => {
                if (!apt) {
                    return next(new Error('Not such apartment'));
                }
                return res.json(apt.notPaidFees);
            })
            .catch((err) => {
                next(new Error(err));
            });
    }

    getNotPaidExpensesById(req, res, next) {
        this.data.apartments.getById(req.params.id)
            .then((apt) => {
                if (!apt) {
                    return next(new Error('Not such apartment'));
                }
                return res.json(apt.notPaidExpenses);
            })
            .catch((err) => {
                next(new Error(err));
            });
    }
}

module.exports = ApiController;
