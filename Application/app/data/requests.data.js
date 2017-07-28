const { ObjectId } = require('mongodb');
const BaseData = require('./base/base.data');

class RequestsData extends BaseData {
    constructor(database, model, validator) {
        super(database, model, validator);
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
        return this.collection
            .remove(filter, options);
    }

    deleteByAppartmentId(apartmentId) {
        const filter = { apartmentId };
        const options = {};
        return this.collection
            .remove(filter, options);
    }
}

module.exports = RequestsData;
