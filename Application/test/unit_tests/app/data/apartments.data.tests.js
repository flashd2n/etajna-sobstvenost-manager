/* eslint-disable max-len */
const { ObjectId } = require('mongodb');
const { expect } = require('chai');
const ApartmentsData = require('../../../../app/data/apartments.data');
const sinon = require('sinon');

describe('Apartments Data Tests', () => {
    let database = null;
    let model = null;
    let validator = null;
    let data = null;
    const items = [1, 2];
    const record = {};
    const apartment = {
        _id: '597f599ece471b28a49d7ed5',
        number: 43,
        username: 'gosho',
        password: '1234',
    };
    const id = '597f599ece471b28a49d7ed5';

    beforeEach(() => {
        database = {
            collection: sinon.stub().returns({
                find: sinon.stub().returns({
                    toArray: sinon.stub().returns(Promise.resolve(items)),
                }),
                findOne: sinon.stub().returns(Promise.resolve(apartment)),
                insert: sinon.stub().returns(Promise.resolve()),
                updateOne: sinon.stub().returns(Promise.resolve()),
                update: sinon.stub().returns(Promise.resolve()),
                updateMany: sinon.stub().returns(Promise.resolve()),
                remove: sinon.stub().returns(Promise.resolve()),
                drop: sinon.stub(),
            }),
        };

        model = {
            name: {
                toLowerCase: () => {
                    return 'model';
                },
            },
            toViewModel: sinon.stub().returns(record),
            toViewModelWithPass: sinon.stub().returns(record),
            getDebt: sinon.stub().returns(42),
            payFee: sinon.stub().returns(record),
            payExpense: sinon.stub().returns(record),
        };

        validator = {
            isValid: sinon.stub().returns(true),
        };

        data = new ApartmentsData(database, model, validator);
    });

    describe('getByNumber tests', () => {
        it('Should call findOne and toViewModel with correct args and return correct object', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getByNumber(42);
                })
                .then((res) => {
                    expect(database.collection().findOne.calledWith({ number: 42 })).to.equal(true);
                    expect(model.toViewModel.calledWith(apartment)).to.equal(true);
                    expect(res).to.equal(record);
                    done();
                });
        });

        it('Should return null when no apartment is found', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve()),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.resolve()),
                    update: sinon.stub().returns(Promise.resolve()),
                    updateMany: sinon.stub().returns(Promise.resolve()),
                    remove: sinon.stub().returns(Promise.resolve()),
                    drop: sinon.stub(),
                }),
            };
            data = new ApartmentsData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.getByNumber(42);
                })
                .then((res) => {
                    expect(res).to.equal(null);
                    done();
                });
        });
    });

    describe('getByUsername tests', () => {
        it('Should call findOne and toViewModel with correct args and return correct object', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getByUsername('gosho');
                })
                .then((res) => {
                    expect(database.collection().findOne.calledWith({ username: 'gosho' })).to.equal(true);
                    expect(model.toViewModel.calledWith(apartment)).to.equal(true);
                    expect(res).to.equal(record);
                    done();
                });
        });

        it('Should return null when no apartment is found', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve()),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.resolve()),
                    update: sinon.stub().returns(Promise.resolve()),
                    updateMany: sinon.stub().returns(Promise.resolve()),
                    remove: sinon.stub().returns(Promise.resolve()),
                    drop: sinon.stub(),
                }),
            };
            data = new ApartmentsData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.getByUsername('gosho');
                })
                .then((res) => {
                    expect(res).to.equal(null);
                    done();
                });
        });
    });

    describe('getByIdWithPass tests', () => {
        it('Should call findOne and toViewModel with correct args and return correct object', (done) => {
            const filter = { _id: new ObjectId(id) };
            Promise.resolve()
                .then(() => {
                    return data.getByIdWithPass(id);
                })
                .then((res) => {
                    expect(database.collection().findOne.calledWith(filter, {})).to.equal(true);
                    expect(model.toViewModelWithPass.calledWith(apartment)).to.equal(true);
                    expect(res).to.equal(record);
                    done();
                });
        });

        it('Should return null when no apartment is found', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve()),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.resolve()),
                    update: sinon.stub().returns(Promise.resolve()),
                    updateMany: sinon.stub().returns(Promise.resolve()),
                    remove: sinon.stub().returns(Promise.resolve()),
                    drop: sinon.stub(),
                }),
            };
            data = new ApartmentsData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.getByIdWithPass(id);
                })
                .then((res) => {
                    expect(res).to.equal(null);
                    done();
                });
        });


        it('Should reject when fondOne rejects with correct message', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.reject('Fail')),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.resolve()),
                    update: sinon.stub().returns(Promise.resolve()),
                    updateMany: sinon.stub().returns(Promise.resolve()),
                    remove: sinon.stub().returns(Promise.resolve()),
                    drop: sinon.stub(),
                }),
            };
            data = new ApartmentsData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.getByIdWithPass(id);
                })
                .catch((res) => {
                    expect(res).to.equal('Fail');
                    done();
                });
        });
    });

    describe('getUnregistered tests', () => {
        it('Should call find one with correct arguments and return correct array', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getUnregistered();
                })
                .then((res) => {
                    expect(database.collection().find.calledWith({ username: '' }, {})).to.equal(true);
                    expect(res).to.deep.equal([record, record]);
                    done();
                });
        });
    });

    describe('getRegistered tests', () => {
        it('Should call find one with correct arguments and return correct array', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getRegistered();
                })
                .then((res) => {
                    expect(database.collection().find.calledWith({ username: { $ne: '' } }, {})).to.equal(true);
                    expect(res).to.deep.equal([record, record]);
                    done();
                });
        });
    });

    describe('getPOSApartments tests', () => {
        it('Should call find one with correct arguments and return correct array', (done) => {
            const filter = {
                $where:
                'this.notPaidFees.length > 0 || this.notPaidExpenses.length > 0',
            };
            Promise.resolve()
                .then(() => {
                    return data.getPOSApartments();
                })
                .then((res) => {
                    expect(database.collection().find.calledWith(filter, {})).to.equal(true);
                    expect(res).to.deep.equal([record, record]);
                    done();
                });
        });
    });

    describe('getNumbersAndDebt tests', () => {
        it('Should call getDebt and return correct array', () => {
            const result = data.getNumbersAndDebt([apartment]);
            expect(result).to.deep.equal([{
                id: apartment._id,
                number: apartment.number,
                debt: 42,
            }]);
            expect(model.getDebt.calledWith(apartment)).to.equal(true);
        });
    });

    describe('authApartment tests', () => {
        it('Should return correct model when username and password are valid', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.authApartment('gosho', '1234');
                })
                .then((res) => {
                    expect(res).to.equal(record);
                    expect(database.collection().findOne.calledWith({ username: 'gosho' })).to.equal(true);
                    done();
                });
        });

        it('Should throw error when passwords do not match', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.authApartment('gosho', '12345');
                })
                .catch((res) => {
                    expect(res.message).to.equal('Invalid password');
                    done();
                });
        });

        it('Should throw error when username is invalid', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve()),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.resolve()),
                    update: sinon.stub().returns(Promise.resolve()),
                    updateMany: sinon.stub().returns(Promise.resolve()),
                    remove: sinon.stub().returns(Promise.resolve()),
                    drop: sinon.stub(),
                }),
            };
            data = new ApartmentsData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.authApartment('gosho', '12345');
                })
                .catch((res) => {
                    expect(res.message).to.equal('Invalid user');
                    done();
                });
        });
    });

    describe('setUsernameAndPassword tests', () => {
        it('Should call update once with correct data', (done) => {
            Promise.resolve()
                .then(() => {
                    data.setUsernameAndPassword(42, 'gosho', '1234');
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(database.collection().update.callCount).to.equal(1);
                    done();
                });
        });
    });

    describe('processFeePayment tests', () => {
        it('Should call payFee and return true when updateOne resolves', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.processFeePayment(apartment, id);
                })
                .then((res) => {
                    expect(res).to.equal(true);
                    expect(model.payFee.calledWith(apartment, id)).to.equal(true);
                    done();
                });
        });

        it('Should reject with correct error when updateOne rejects', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve(apartment)),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.reject('Fail')),
                    update: sinon.stub().returns(Promise.resolve()),
                    updateMany: sinon.stub().returns(Promise.resolve()),
                    remove: sinon.stub().returns(Promise.resolve()),
                    drop: sinon.stub(),
                }),
            };
            data = new ApartmentsData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.processFeePayment(apartment, id);
                })
                .catch((res) => {
                    expect(res).to.equal('Fail');
                    done();
                });
        });
    });

    describe('processExpensePayment tests', () => {
        it('Should call payFee and return true when updateOne resolves', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.processExpensePayment(apartment, id);
                })
                .then((res) => {
                    expect(res).to.equal(true);
                    expect(model.payExpense.calledWith(apartment, id)).to.equal(true);
                    done();
                });
        });

        it('Should reject with correct error when updateOne rejects', (done) => {
            database = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve(apartment)),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.reject('Fail')),
                    update: sinon.stub().returns(Promise.resolve()),
                    updateMany: sinon.stub().returns(Promise.resolve()),
                    remove: sinon.stub().returns(Promise.resolve()),
                    drop: sinon.stub(),
                }),
            };
            data = new ApartmentsData(database, model, validator);
            Promise.resolve()
                .then(() => {
                    return data.processExpensePayment(apartment, id);
                })
                .catch((res) => {
                    expect(res).to.equal('Fail');
                    done();
                });
        });
    });
});
