class ValidatorController {
    validateRegister(req, res, next) {
        const id = req.body.appartment_id;
        const username = req.body.username;
        const password = req.body.password;

        if (id.length !== 24 || username.length <= 2 || password.length <= 2) {
            return next(new Error('Invalid register crendentials'));
        }
        return next();
    }

    validateLogin(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        if (username.length <= 2 || password.length <= 2) {
            return next(new Error('Invalid login crendentials'));
        }
        return next();
    }

    validateExpense(req, res, next) {
        const name = req.body.name;
        const description = req.body.description;
        const cost = req.body.cost;
        if (name.length === 0 || description.length === 0 || isNaN(cost)) {
            return next(new Error('Invalid expense parameters'));
        }
        return next();
    }

    validateFee(req, res, next) {
        const month = req.body.month;
        const year = req.body.year;
        const cost = req.body.fee;
        if (isNaN(month) || isNaN(year) || isNaN(cost)) {
            return next(new Error('Invalid fee parameters'));
        }
        return next();
    }

    validatePayFee(req, res, next) {
        const feeId = req.body.feeId;
        const aptId = req.params.aptId;
        if (feeId.length !== 24 || aptId.length !== 24) {
            return next(new Error('Invalid fee payment parameters'));
        }
        return next();
    }

    validatePayExpense(req, res, next) {
        const aptId = req.params.aptId;
        const expenseId = req.body.expenseId;
        if (aptId.length !== 24 || expenseId.length !== 24) {
            return next(new Error('Invalid expense payment parameters'));
        }
        return next();
    }
}

module.exports = ValidatorController;
