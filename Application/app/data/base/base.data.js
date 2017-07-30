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

        return this.collection.find(filter, options)
            .toArray()
            .then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
    }

    getById(id) {
        const filter = { _id: new ObjectId(id) };
        const options = {};
        return this.collection
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

    updateById(id, model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }

        return this.collection.updateOne({ _id: new ObjectId(id) }, model);
    }

    processAptPayment(apt, debtId) {
        const filter = {
            _id: new ObjectId(debtId),
        };
        const options = {
            $pull: {
                notPaid: {
                    number: apt.number,
                },
            },
            $addToSet: {
                paid: {
                    _id: apt._id,
                    number: apt.number,
                    username: apt.username,
                    moveInDate: apt.moveInDate,
                },
            },
        };

        return this.collection.update(filter, options)
            .then(() => {
                return 'Success';
            })
            .catch((err) => {
                Promise.reject(err);
            });
    }

    _isModelValid(model) {
        if (!this.validator) {
            return false;
        }

        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
