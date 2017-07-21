const BaseData = require('./base/base.data');
const Manager = require('../models/manager.model');

class ManagerData extends BaseData {
    constructor(database) {
        super(database, Manager);
    }

    getUsername() {
        return this.collection.findOne()
            .then((manager) => Promise.resolve(manager.username));
    }

    setUsernameAndPasswordHash(username, passowrdHash) {
        this.collection.drop(); // only one record in this collection allowed
        return this.create({
            username,
            passowrdHash,
        });
    }

    checkValidUserUsernameAndPasswordHash(username, passowrdHash) {
        return this.collection
            .findOne({
                username,
            })
            .then((manager) => {
                if (!manager) {
                    throw new Error('Invalid user');
                }

                if (manager.passowrdHash !== passowrdHash) {
                    throw new Error('Invalid password');
                }

                return this.ModelClass.toViewModel(manager);
            });
    }

    _getCollectionName() {
        // otherwise the database collection will be called 'managers'
        return 'manager';
    }
}

module.exports = ManagerData;
