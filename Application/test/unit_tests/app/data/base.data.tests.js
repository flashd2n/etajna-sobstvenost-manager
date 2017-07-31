/* eslint-disable max-len */

const { expect } = require('chai');
const BaseData = require('../../../../app/data/base/base.data');
const sinon = require('sinon');

describe('Base Data Tests', () => {
    let db = null;
    let modelClass = null;
    let validator = null;
    const items = [1, 2, 3, 4];
    const record = {};
    const id = '597f599ece471b28a49d7ed5';
    let data = null;
    const apt = {
        _id: '1234',
        number: 42,
        username: 'gosho',
        moveInDate: 1232131,
    };

    beforeEach(() => {
        db = {
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

        modelClass = {
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

        data = new BaseData(db, modelClass, validator);
    });

    describe('getAll tests', () => {
        it('call collection.find once', () => {
            const sut = new BaseData(db, modelClass, validator);
            return sut.getAll()
                .then(() => {
                    expect(db.collection().find.callCount).to.equal(1);
                });
        });

        it('call collection.find.toarray once', () => {
            const sut = new BaseData(db, modelClass, validator);
            return sut.getAll()
                .then(() => {
                    expect(db.collection().find().toArray.callCount).to.equal(1);
                });
        });

        it('call collection.find with empty object as filter', () => {
            const sut = new BaseData(db, modelClass, validator);
            const filter = {};
            const options = {};
            return sut.getAll()
                .then(() => {
                    expect(db.collection().find
                        .calledWith(filter, options)).to.equal(true);
                });
        });

        it('call modelclass.toviewmodel correct number of times', () => {
            const sut = new BaseData(db, modelClass, validator);
            return sut.getAll()
                .then(() => {
                    expect(modelClass.toViewModel.callCount).to.equal(items.length);
                });
        });

        it('call modelclass.toviewmodel with correct arguments', () => {
            const sut = new BaseData(db, modelClass, validator);
            return sut.getAll()
                .then(() => {
                    expect(modelClass.toViewModel
                        .calledWith(items[0])).to.equal(true);
                    expect(modelClass.toViewModel
                        .calledWith(items[1])).to.equal(true);
                    expect(modelClass.toViewModel
                        .calledWith(items[2])).to.equal(true);
                    expect(modelClass.toViewModel
                        .calledWith(items[3])).to.equal(true);
                });
        });
    });

    describe('getById tests', () => {
        it('Should call toViewModel and return correct record when found in db', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.getById(id);
                })
                .then((result) => {
                    expect(modelClass.toViewModel.callCount).to.equal(1);
                    expect(result).to.equal(record);
                    done();
                });
        });

        it('Should reject when record is not found in db', (done) => {
            db = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve()),
                }),
            };
            data = new BaseData(db, modelClass, validator);
            Promise.resolve()
                .then(() => {
                    return data.getById(id);
                })
                .catch((err) => {
                    expect(err).to.equal('info');
                    done();
                });
        });

        it('Should return record without calling toViewModel when no toViewModel', (done) => {
            modelClass = {
                name: {
                    toLowerCase: () => {
                        return 'model';
                    },
                },
            };
            data = new BaseData(db, modelClass, validator);
            Promise.resolve()
                .then(() => {
                    return data.getById(id);
                })
                .then((result) => {
                    expect(result).to.equal(record);
                    done();
                });
        });
    });

    describe('create tests', () => {
        it('Should return the model after calling insert and toViewModel', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.create(record);
                })
                .then((result) => {
                    expect(result).to.equal(record);
                    done();
                });
        });

        it('Should reject when model is not valid', (done) => {
            validator = {
                isValid: sinon.stub().returns(false),
            };
            data = new BaseData(db, modelClass, validator);
            Promise.resolve()
                .then(() => {
                    return data.create(record);
                })
                .catch((err) => {
                    expect(err).to.equal('Invalid model');
                    done();
                });
        });
    });

    describe('updateById tests', () => {
        it('Should call updateOne with correct arguments when valid model', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.updateById(id, record);
                })
                .then(() => {
                    expect(db.collection().updateOne.callCount).to.equal(1);
                    done();
                });
        });

        it('Should reject when model is not valid', (done) => {
            validator = {
                isValid: sinon.stub().returns(false),
            };
            data = new BaseData(db, modelClass, validator);
            Promise.resolve()
                .then(() => {
                    return data.updateById(id, record);
                })
                .catch((err) => {
                    expect(err).to.equal('Invalid model');
                    done();
                });
        });
    });

    describe('processAptPayment tests', () => {
        it('Should call update and return success when process is valid', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.processAptPayment(apt, id);
                })
                .then((res) => {
                    expect(db.collection().update.callCount).to.equal(1);
                    expect(res).to.equal('Success');
                    done();
                });
        });

        it('Should call update and return fail when process is invalid', (done) => {
            db = {
                collection: sinon.stub().returns({
                    find: sinon.stub().returns({
                        toArray: sinon.stub().returns(Promise.resolve(items)),
                    }),
                    findOne: sinon.stub().returns(Promise.resolve(record)),
                    insert: sinon.stub().returns(Promise.resolve()),
                    updateOne: sinon.stub().returns(Promise.resolve()),
                    update: sinon.stub().returns(Promise.reject()),
                }),
            };
            data = new BaseData(db, modelClass, validator);
            Promise.resolve()
                .then(() => {
                    return data.processAptPayment(apt, id);
                })
                .catch((res) => {
                    expect(db.collection().update.callCount).to.equal(1);
                    expect(res).to.equal('Fail');
                    done();
                });
        });
    });

    describe('removeAptFromNotPaid tests', () => {
        it('Should call updateMany and resolve when valid opr', (done) => {
            Promise.resolve()
                .then(() => {
                    return data.removeAptFromNotPaid(42);
                })
                .then(() => {
                    expect(db.collection().updateMany.callCount).to.equal(1);
                    done();
                });
        });
    });

    describe('_isModelValid tests', () => {
        it('Should return false when no validator', () => {
            validator = null;
            data = new BaseData(db, modelClass, validator);
            const result = data._isModelValid(record);
            expect(result).to.equal(false);
        });
    });
});
