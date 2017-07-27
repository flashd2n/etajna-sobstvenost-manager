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

    payFee(req, res, next) {
        const aptId = req.params.aptId;
        const feeId = req.body.feeId;

        this.data.apartments.getById(aptId)
            .then((apt) => {
                return this.data.apartments.processFeePayment(apt, feeId);
            })
            .then((isSuccess) => {
                if (isSuccess) {
                    res.send('Success');
                }
            })
            .catch((err) => {
                res.send('Fail');
            });
    }

    payExpense(req, res, next) {
        const aptId = req.params.aptId;
        const expenseId = req.body.expenseId;

        this.data.apartments.getById(aptId)
            .then((apt) => {
                return this.data.apartments
                    .processExpensePayment(apt, expenseId);
            })
            .then((isSuccess) => {
                if (isSuccess) {
                    res.send('Success');
                }
            })
            .catch((err) => {
                res.send('Fail');
            });
    }
}

module.exports = ApiController;
