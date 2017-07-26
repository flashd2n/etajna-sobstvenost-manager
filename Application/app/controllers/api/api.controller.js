class ApiController {
    constructor(data) {
        this.data = data;
    }

    retriveUser(req, res, next) {
        if (!req.user) {
            const msg = 'No username found!';
            const error = { message: msg, code: 500 };
            return next(new Error(JSON.stringify(error)));
        }
        return res.json(req.user);
    }
}

module.exports = ApiController;
