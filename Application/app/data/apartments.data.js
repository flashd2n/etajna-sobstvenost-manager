const { ObjectId } = require('mongodb');
const BaseData = require('./base/base.data');

class ApartmentsData extends BaseData {
    constructor(database, model, validator) {
        super(database, model, validator);
    }

    getByNumber(number) {
        return this.collection
            .findOne({
                number,
            })
            .then((apartment) => {
                if (!apartment) {
                    return Promise.resolve(null);
                }
                return Promise.resolve(this.ModelClass.toViewModel(apartment));
            });
    }

    getByUsername(username) {
        return this.collection
            .findOne({
                username,
            })
            .then((model) => {
                if (!model) {
                    return Promise.resolve(null);
                }
                return Promise.resolve(this.ModelClass.toViewModel(model));
            });
    }

    getById(id) {
        const filter = { _id: new ObjectId(id) };
        const options = {};
        return this.collection
            .findOne(filter, options)
            .then((model) => {
                if (!model) {
                    return Promise.resolve(null);
                }
                return Promise.resolve(this.ModelClass.toViewModel(model));
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }

    getUnregistered() {
        const filter = { username: '' };
        const options = {};
        return this.collection
            .find(filter, options)
            .toArray()
            .then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
    }

    getRegistered() {
        const filter = { username: { $ne: '' } };
        const options = {};
        return this.collection
            .find(filter, options)
            .toArray()
            .then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
    }

    getPOSApartments() {
        const filter = {
            $where:
            'this.notPaidFees.length > 0 || this.notPaidExpenses.length > 0',
        };
        const options = {};
        return this.collection
            .find(filter, options)
            .toArray()
            .then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
    }

    getNumbersAndDebt(apartments) {
        return apartments.map((apt) => {
            return {
                id: apt._id,
                number: apt.number,
                debt: this.ModelClass.getDebt(apt),
            };
        });
    }

    authApartment(username, passwordHash) {
        return this.collection
            .findOne({
                username,
            })
            .then((apartment) => {
                if (!apartment) {
                    throw new Error('Invalid user');
                }

                if (apartment.password !== passwordHash) {
                    throw new Error('Invalid password');
                }

                return this.ModelClass.toViewModel(apartment);
            });
    }

    setUsernameAndPassword(number, username, passwordHash) {
        const filter = { number };
        this.getByNumber(number)
            .then((updatedApartment) => {
                updatedApartment.username = username;
                updatedApartment.password = passwordHash;
                const options = {};
                this.collection
                    .update(filter, updatedApartment, options);
            });
    }

    processFeePayment(apt, feeId) {
        const updatedApt = this.ModelClass.payFee(apt, feeId);
        const filter = {
            _id: updatedApt._id,
        };

        return this.collection.updateOne(filter, updatedApt)
            .then(() => {
                return true;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }

    processExpensePayment(apt, expenseId) {
        const updatedApt = this.ModelClass.payExpense(apt, expenseId);
        const filter = {
            _id: updatedApt._id,
        };

        return this.collection.updateOne(filter, updatedApt)
            .then(() => {
                return true;
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }

    addExpense(apartmentId, expense) {
        const filter = { _id: new ObjectId(apartmentId) };
        const options = {
            $addToSet: {
                notPaidExpenses: expense,
            },
        };
        return this.collection.updateOne(filter, options);
    }

    addFee(apartmentId, fee) {
        const filter = { _id: new ObjectId(apartmentId) };
        const options = {
            $addToSet: {
                notPaidFees: fee,
            },
        };
        return this.collection.updateOne(filter, options);
    }

    completeExpense(expenseId) {
        return this._setExpenseState(expenseId, 'completed');
    }

    cancelExpense(expenseId) {
        return this._setExpenseState(expenseId, 'canceled');
    }

    _setExpenseState(expenseId, state) {
        const filter = {};
        const options = {};
        return this.collection.
            find(filter, options)
            .toArray()
            .then((apartments) => {
                apartments
                    .forEach((apartment) => {
                        for (let i = 0;
                            i < apartment.paidExpenses.length;
                            i++) {
                            if (apartment.paidExpenses[i]._id.toString()
                                === expenseId) {
                                console.log(apartment.paidExpenses[i]);
                                apartment.paidExpenses[i].state = state;
                                break;
                            }
                        }

                        for (let i = 0;
                            i < apartment.notPaidExpenses.length;
                            i++) {
                            if (apartment.notPaidExpenses[i]._id.toString()
                                === expenseId) {
                                apartment.notPaidExpenses[i].state = state;
                                break;
                            }
                        }

                        this.collection.updateOne({
                            _id: new ObjectId(apartment._id),
                            }, apartment);
                    });
            });
    }
}

module.exports = ApartmentsData;
