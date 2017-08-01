/* eslint-disable max-len */
const { expect } = require('chai');
const Base = require('../../../../app/models/base/base.model');

describe('Apartment Model Tests', () => {
    let data = {
        age: 42,
    };

    it('id getter should return _id as a string', () => {
        const model = new Base();
        model._id = 3;
        expect(model.id).to.equal('3');
    });

    it('toViewModel should return correct object', () => {
        const model = Base.toViewModel(data);
        expect(model.constructor.name).to.equal('BaseModel');
        expect(model.age).to.equal(data.age);
    });

    it('toViewModel should return correct object wihtout password', () => {
        data = {
            password: '1234',
            age: 42,
        };
        const model = Base.toViewModel(data);
        expect(model.constructor.name).to.equal('BaseModel');
        expect(model.age).to.equal(data.age);
        expect(typeof model.password).to.equal('undefined');
    });

    it('toViewModelWithPass should return correct object wiht password', () => {
        data = {
            password: '1234',
            age: 42,
        };
        const model = Base.toViewModelWithPass(data);
        expect(model.constructor.name).to.equal('BaseModel');
        expect(model.age).to.equal(data.age);
        expect(model.password).to.equal('1234');
    });
});
