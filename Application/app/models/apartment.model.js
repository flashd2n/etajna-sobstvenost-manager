const BaseModel = require('./base/base.model');

class Apartment extends BaseModel {
    constructor() {
        super();
    }

    // static isValid(model) {
    //     return typeof model !== 'undefined' &&
    //         typeof model.appartmentNameOrNumber === 'string' &&
    //         typeof model.appartmentNameOrNumber;
    // }
}

module.exports = Apartment;
