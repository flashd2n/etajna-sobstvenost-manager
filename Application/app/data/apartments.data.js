const { ObjectId } = require('mongodb');
const BaseData = require('./base/base.data');
const Apartment = require('../models/apartment.model');

class ApartmentsData extends BaseData {
    constructor(database, validator) {
        super(database, Apartment, validator);
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

    getTotalExpenses(apt){
        this.model.getExpenses(apt);
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
}

module.exports = ApartmentsData;
