const { ObjectId } = require('mongodb');

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
        let apt = null;

        this.data.apartments.getById(aptId)
            .then((_apt) => {
                apt = _apt;
                return this.data.apartments.processFeePayment(_apt, feeId);
            })
            .then(() => {
                return this.data.fees.processAptPayment(apt, feeId);
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
        let aptNumber = 0;
        let apt = null;

        this.data.apartments.getById(aptId)
            .then((_apt) => {
                apt = _apt;
                aptNumber = _apt.number;
                return this.data.apartments
                    .processExpensePayment(_apt, expenseId);
            })
            .then(() => {
                return this.data.expenses.processAptPayment(apt, expenseId);
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

    getAllDebtors(req, res, next) {
        this.data.apartments.getPOSApartments()
            .then((apartments) => {
                res.json(apartments);
            })
            .catch((err) => {
                next(err);
            });
    }

    getCurrentExpenses(req, res, next) {
        this.data.expenses.getPendingExpenses()
            .then((expenses) => {
                res.json(expenses);
            })
            .catch((err) => {
                next(err);
            });
    }

    removeApt(req, res, next) {
        const number = +req.params.aptNum;

        this.data.apartments.deleteApartment(number)
            .then(() => {
                return this.data.expenses.removeAptFromNotPaid(number);
            })
            .then(() => {
                return this.data.fees.removeAptFromNotPaid(number);
            })
            .then(() => {
                res.send('Success');
            })
            .catch(() => {
                res.status(500).send('Fail');
            });
    }
}

module.exports = ApiController;
