const BaseData = require('./base/base.data');

class ExpensesData extends BaseData {
    constructor(database, model, validator) {
        super(database, model, validator);
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

    getCompletedExpenses() {
        const filter = {
            state: 'completed',
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

    getCollectedPayments(expense) {
        const collectedPayments = expense.paid.length * expense.cost;
        return collectedPayments;
    }
}

module.exports = ExpensesData;
