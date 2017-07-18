const { ObjectId } = require('mongodb');

class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        const filter = {};
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

    getById(id) {
        const filter = { _id: new ObjectId(id) };
        const options = {};
        const result = this.collection
            .findOne(filter, options)
            .then((foundRecord) => {
                if (!foundRecord) {
                    return Promise.reject();
                }

                if (this.ModelClass.toViewModel) {
                    foundRecord = this.ModelClass.toViewModel(foundRecord);
                }

                return foundRecord;
            });
        return result;
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }

        return this.collection.insert(model)
            .then(() => {
                return this.ModelClass.toViewModel(model);
            });
    }

    _isModelValid(model) {
        if (!this.validator) {
            return true;
        }

        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
