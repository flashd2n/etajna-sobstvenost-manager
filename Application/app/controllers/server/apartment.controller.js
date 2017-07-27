class ApartmentController {
    constructor(data) {
        this.data = data;
    }

    renderMyApt(req, res) {
        res.render('my_apartment', { loggedUser: req.user });
        // res.send('My apartment' + req.user.username);
    }

    renderChat(req, res) {
        res.render('chat', { loggedUser: req.user });
        // res.send('My apartment' + req.user.username);
    }
}

module.exports = ApartmentController;
