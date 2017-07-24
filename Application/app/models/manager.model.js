const BaseModel = require('./base/base.model');

class Manager extends BaseModel {
    constructor() {
        super();
    }

    // static isValid(model) {
    //     return typeof model !== 'undefined' &&
    //         typeof model.username === 'string' &&
    //         typeof model.passwordHash === 'string';
    // }
}

module.exports = Manager;
