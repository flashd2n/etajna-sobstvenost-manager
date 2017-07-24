class ErrorController {
    constructor(logger) {
        this.logger = logger;
    }

    handleError(err, req, res, next) {
        const error = JSON.parse(err.message);
        this.logger.log(error.message);
        this.logger.log(error.code);
        res.status(500).send('Error!!!');
    }
}

module.exports = ErrorController;
