const BaseData = require('./base/base.data');

class FeesData extends BaseData {
constructor(database, model, validator) {
        super(database, model, validator);
    }
}

module.exports = FeesData;
