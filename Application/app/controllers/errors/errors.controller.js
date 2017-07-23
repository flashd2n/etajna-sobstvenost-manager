const log = require('../../utils/logger');

class ErrorController {
    handleError(err, req, res, next) {
        const error = JSON.parse(err.message);
        log(error.message);
        log(error.code);
        res.send('Error!!!');
    }
}

module.exports = { ErrorController };
