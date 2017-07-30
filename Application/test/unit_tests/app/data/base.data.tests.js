const { expect } = require('chai');
const BaseData = require('../../../../app/data/base/base.data');
const sinon = require('sinon');

describe('getAll() tests', () => {
    let db = null;
    let modelClass = null;
    const validator = null;
    const items = [1, 2, 3, 4];

    beforeEach(() => {
        db = {
            collection: sinon.stub().returns({
                find: sinon.stub().returns({
                    toArray: sinon.stub().returns(Promise.resolve(items)),
                }),
            }),
        };

        modelClass = {
            name: {
                toLowerCase: () => {
                    return 'model';
                },
            },
            toViewModel: sinon.stub().returns(true),
        };
    });

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

    // it('catch to catch a rejected promise', () => {
    //     const err = new Error('Test');
    //     db = {
    //         collection: sinon.stub().returns({
    //             find: sinon.stub().returns({
    //                 toArray: sinon.stub().rejects(err),
    //             }),
    //         }),
    //     };
    //     const sut = new BaseData(db, modelClass, validator);
    //     return sut.getAll()
    //         .then(() => {
    //             expect(modelClass.toViewModel.callCount).to.equal(1);
    //             expect(modelClass.toViewModel
                        // .calledWith(err)).to.equal(true);
    //         });
    // });
});
