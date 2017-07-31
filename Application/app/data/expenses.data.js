const BaseData = require('./base/base.data');
const { ObjectId } = require('mongodb');

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
                return Promise.reject(err);
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
                return Promise.reject(err);
            });
    }

    getCanceledExpenses() {
        const filter = {
            state: 'canceled',
        };

        return this.collection.find(filter).toArray()
            .then((dbExp) => {
                return dbExp.map((exp) => {
                    return this.ModelClass.toViewModel(exp);
                });
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    getCollectedPayments(expense) {
        const collectedPayments = expense.paid.length * expense.cost;
        return collectedPayments;
    }

    completeExpense(id) {
        return this.getById(id)
            .then((expense) => {
                const filter = {
                    _id: new ObjectId(id),
                    state: 'pending',
                    notPaid: {
                        $size: 0,
                    },
                };
                const options = {};
                expense.state = 'completed';
                return this.collection.updateOne(filter, expense, options);
            });
    }

    cancelExpense(id) {
        return this.getById(id)
            .then((expense) => {
                const filter = {
                    _id: new ObjectId(id),
                    state: 'pending',
                };
                const options = {};
                expense.state = 'canceled';
                return this.collection.updateOne(filter, expense, options);
            });
    }
}

module.exports = ExpensesData;
