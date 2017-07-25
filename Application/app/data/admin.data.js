const BaseData = require('./base/base.data');
const Admin = require('../models/admin.model');

class AdminData extends BaseData {
    constructor(database, validator) {
        super(database, Admin, validator);
    }

    getUsername() {
        return this.collection.findOne()
            .then((admin) => Promise.resolve(admin.username));
    }

    setUsernameAndPasswordHash(username, passowrdHash) {
        this.collection.drop();
        return this.create({
            username,
            passowrdHash,
        });
    }

    authAdmin(username, passwordHash) {
        return this.collection
            .findOne({
                username,
            })
            .then((manager) => {
                if (!manager) {
                    throw new Error('Invalid user');
                }

                if (manager.password !== passwordHash) {
                    throw new Error('Invalid password');
                }

                return this.ModelClass.toViewModel(manager);
            });
    }
}

module.exports = AdminData;
