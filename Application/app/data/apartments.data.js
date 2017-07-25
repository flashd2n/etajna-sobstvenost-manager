// const { ObjectId } = require('mongodb');
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

    getUnregistered() {
        // idea basedata -> getByUsername()
        const filter = { username: '' };
        const options = {};
        let result = this.collection
            .find(filter, options)
            .toArray();

        if (this.ModelClass.toViewModel) {
            console.log(this.ModelClass);
            result = result.then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
        }
        return result;
    }

    authApartment(username, passwordHash) {
        return this.collection
            .findOne({
                username,
            })
            .then((apartment) => {
                // console.log(apartment);
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
