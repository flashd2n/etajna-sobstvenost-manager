const BaseData = require('./base/base.data');
const Fee = require('../models/fee.model');

class FeesData extends BaseData {
constructor(database, validator) {
        super(database, Fee, validator);
    }
}

module.exports = FeesData;
