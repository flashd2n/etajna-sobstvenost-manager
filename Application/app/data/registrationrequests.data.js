const { ObjectId } = require('mongodb');
const BaseData = require('./base/base.data');
const RegistrationRequest = require('../models/registrationrequest.model');

class RegistrationRequestsData extends BaseData {
    constructor(database) {
        super(database, RegistrationRequest);
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

    deleteById(id) {
        const filter = { _id: new ObjectId(id) };
        const options = {};
        const result = this.collection
            .remove(filter, options);
        return result;
    }

    deleteByAppartmentId(appartmentId) {
        const filter = { appartmentId };
        const options = {};
        const result = this.collection
            .remove(filter, options);
        return result;
    }
}

module.exports = RegistrationRequestsData;
