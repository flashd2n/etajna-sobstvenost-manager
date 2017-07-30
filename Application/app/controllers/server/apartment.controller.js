class ApartmentController {
    constructor(data) {
        this.data = data;
    }

    renderMyApt(req, res, next) {
        const aptId = req.params.id;
        this.data.apartments.getById(aptId)
            .then((apt) => {
                if (!apt) {
                    return next(new Error('Invalid apartment id!'));
                }
                return res.render('my_apartment', {
                    loggedUser: req.user,
                    page: 'apartment',
                });
            })
            .catch((err) => {
                next(new Error(err));
            });
    }

    renderChat(req, res) {
        res.render('chat', { loggedUser: req.user });
    }
}

module.exports = ApartmentController;
