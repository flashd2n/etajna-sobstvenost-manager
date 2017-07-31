/* eslint-disable max-len */
const { ObjectId } = require('mongodb');
const { expect } = require('chai');
const ExpensesData = require('../../../../app/data/expenses.data');
const sinon = require('sinon');

describe('Expenses Data Tests', () => {
    let database = null;
    let model = null;
    let validator = null;
    let data = null;
    const items = [1, 2];
    const record = {};
    const id = '597f599ece471b28a49d7ed5';

    beforeEach(() => {
        database = {
            collection: sinon.stub().returns({
                find: sinon.stub().returns({
                    toArray: sinon.stub().returns(Promise.resolve(items)),
                }),
                findOne: sinon.stub().returns(Promise.resolve(record)),
                insert: sinon.stub().returns(Promise.resolve()),
                updateOne: sinon.stub().returns(Promise.resolve()),
                update: sinon.stub().returns(Promise.resolve()),
                updateMany: sinon.stub().returns(Promise.resolve()),
            }),
        };

        model = {
            name: {
                toLowerCase: () => {
                    return 'model';
                },
            },
            toViewModel: sinon.stub().returns(record),
        };

        validator = {
            isValid: sinon.stub().returns(true),
        };

        data = new ExpensesData(database, model, validator);
    });

    describe('getPendingExpenses tests', () => {
        it('Should call find with correct filter and return an array with length 2', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getPendingExpenses();
                })
                .then((res) => {
                    expect(database.collection().find.calledWith({ state: 'pending' })).to.equal(true);
                    expect(res).to.have.length(2);
                    done();
                });
        });

        it('Should reject with correct message when find rejects', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.reject('Fail')),
                    }),
                }),
            };
            data = new ExpensesData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.getPendingExpenses();
                })
                .catch((res) => {
                    expect(res).to.equal('Fail');
                    done();
                });
        });
    });

    describe('getCompletedExpenses tests', () => {
        it('Should call find with correct filter and return an array with length 2', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getCompletedExpenses();
                })
                .then((res) => {
                    expect(database.collection().find.calledWith({ state: 'completed' })).to.equal(true);
                    expect(res).to.have.length(2);
                    done();
                });
        });

        it('Should reject with correct message when find rejects', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.reject('Fail')),
                    }),
                }),
            };
            data = new ExpensesData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.getCompletedExpenses();
                })
                .catch((res) => {
                    expect(res).to.equal('Fail');
                    done();
                });
        });
    });

    describe('getCanceledExpenses tests', () => {
        it('Should call find with correct filter and return an array with length 2', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getCanceledExpenses();
                })
                .then((res) => {
                    expect(database.collection().find.calledWith({ state: 'canceled' })).to.equal(true);
                    expect(res).to.have.length(2);
                    done();
                });
        });

        it('Should reject with correct message when find rejects', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.reject('Fail')),
                    }),
                }),
            };
            data = new ExpensesData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.getCanceledExpenses();
                })
                .catch((res) => {
                    expect(res).to.equal('Fail');
                    done();
                });
        });
    });

    describe('getCollectedPayments tests', () => {
        it('Should return correct collected payments', () => {
            const expense = {
                paid: {
                    length: 2,
                },
                cost: 50,
            };
            const result = data.getCollectedPayments(expense);
            expect(result).to.equal(100);
        });
    });

    describe('completeExpense tests', () => {
        it('Should call updateOne with correct arguments and resove when id is valid', (done) => {
            const filter = {
                _id: new ObjectId(id),
                state: 'pending',
                notPaid: {
                    $size: 0,
                },
            };
            Promise.resolve()
                .then(() => {
                    return data.completeExpense(id);
                })
                .then(() => {
                    expect(database.collection().updateOne.callCount).to.equal(1);
                    expect(database.collection().updateOne.calledWith(filter, { state: 'completed' }, {})).to.equal(true);
                    done();
                });
        });
    });

    describe('cancelExpense tests', () => {
        it('Should call updateOne with correct arguments and resove when id is valid', (done) => {
            const filter = {
                _id: new ObjectId(id),
                state: 'pending',
            };
            Promise.resolve()
                .then(() => {
                    return data.cancelExpense(id);
                })
                .then(() => {
                    expect(database.collection().updateOne.callCount).to.equal(1);
                    expect(database.collection().updateOne.calledWith(filter, { state: 'canceled' }, {})).to.equal(true);
                    done();
                });
        });
    });
});
