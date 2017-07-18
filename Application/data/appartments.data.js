const BaseData = require('./base/base.data');
const Appartment = require('../models/appartment.model');

class AppartmentsData extends BaseData {
    constructor(database) {
        super(database, Appartment);
    }

    checkValidUserUsername(username, password) {
        // Plaintext for now, must be changed to hash
        return this.collection
            .findOne({
                username,
            })
            .then((appartment) => {
                if (!appartment) {
                    throw new Error('Invalid user');
                }

                if (appartment.password !== password) {
                    throw new Error('Invalid password');
                }

                return this.ModelClass.toViewModel(appartment);
            });
    }
}

module.exports = AppartmentsData;
