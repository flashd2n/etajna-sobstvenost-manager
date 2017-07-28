const BaseData = require('./base/base.data');
const Expense = require('../models/expense.model');

class ExpensesData extends BaseData {
    constructor(database, validator) {
        super(database, Expense, validator);
    }

    getPendingExpenses() {
        const filter = {
            state: 'pending',
        };

        return this.collection.find(filter).toArray()
            .then((dbExp) => {
                return dbExp.map((exp) => {
                    return this.ModelClass.toViewModel(exp);
                });
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }
}

module.exports = ExpensesData;
