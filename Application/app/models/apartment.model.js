const BaseModel = require('./base/base.model');

class Apartment extends BaseModel {
    constructor() {
        super();
    }

    static payFee(apt, feeId) {
        const paidFee = apt.notPaidFees.find((f) => f._id + '' === feeId);
        const index = apt.notPaidFees.findIndex((f) => f._id + '' === feeId);

        if (index > -1) {
            apt.notPaidFees.splice(index, 1);
        }
        apt.paidFees.push(paidFee);

        return apt;
    }

    static getDebt(apt) {
        const FeesDebts = apt.notPaidFees.reduce((x, y) => x + y.cost, 0);
        const ExpensesDebts = apt.notPaidExpenses
            .reduce((x, y) => x + y.cost, 0);
        return FeesDebts + ExpensesDebts;
    }

    static payExpense(apt, expenseId) {
        const paidFee = apt.notPaidExpenses
            .find((f) => f._id + '' === expenseId);

        const index = apt.notPaidExpenses
            .findIndex((f) => f._id + '' === expenseId);

        if (index > -1) {
            apt.notPaidExpenses.splice(index, 1);
        }

        apt.paidExpenses.push(paidFee);

        return apt;
    }
}

module.exports = Apartment;
