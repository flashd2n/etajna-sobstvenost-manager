const BaseModel = require('./base/base.model');

class Request extends BaseModel {
    constructor() {
        super();
    }

    // static isValid(model) {
    //     if (typeof model === 'undefined') {
    //         return false;
    //     }

    //     if (typeof model.appartmentNameOrNumber !== 'string' ||
    //         typeof model.appartmentNameOrNumber) {
    //         return false;
    //     }

    //     if (typeof model.username !== 'string' ||
    //         typeof model.username.length <= 3) {
    //         return false;
    //     }

    //     if (typeof model.passwordHash !== 'string' ||
    //         typeof model.passwordHash.length < 64 ||
    //         typeof model.passwordHash.length > 64) {
    //         return false;
    //     }

    //     if (typeof model.appartmentId === 'undefined') {
    //         return false;
    //     }

    //     return true;
    // }
}

module.exports = Request;
