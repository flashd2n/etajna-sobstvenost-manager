const { ObjectId } = require('mongodb');
const BaseData = require('./base/base.data');
const Appartment = require('../models/appartment.model');

class AppartmentsData extends BaseData {
    constructor(database, validator) {
        super(database, Appartment, validator);
    }

    getByNameOrNumber(nameOrNumber) {
        return this.collection
            .findOne({
                appartmentNameOrNumber: nameOrNumber,
            })
            .then((appartment) => {
                if (!appartment) {
                    return Promise.resolve(null);
                }
                return Promise.resolve(this.ModelClass.toViewModel(appartment));
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
        const filter = { username: null };
        const options = {};
        let result = this.collection
            .find(filter, options)
            .toArray();

        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
        }

        return result;
    }

    checkValidUserUsernameAndPasswordHash(username, passwordHash) {
        return this.collection
            .findOne({
                username,
            })
            .then((apartment) => {
                console.log(apartment);
                if (!apartment) {
                    throw new Error('Invalid user');
                }

                if (apartment.password !== passwordHash) {
                    throw new Error('Invalid password');
                }

                return this.ModelClass.toViewModel(apartment);
            });
    }

    setUsernameAndPassword(id, username, passwordHash) {
        const filter = { _id: new ObjectId(id) };
        this.getById(id)
            .then((updatedApartment) => {
                updatedApartment.username = username;
                updatedApartment.passwordHash = passwordHash;
                const options = {};
                this.collection
                    .update(filter, updatedApartment, options);
            });
    }
}

module.exports = AppartmentsData;
