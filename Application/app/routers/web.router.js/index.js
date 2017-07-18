const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/page-of-shame', (req, res) => {
        res.send('page of shame page');
    });

    app.get('/unpaid-appartment-expenses/:appartmentId', (req, res) => {
        res.send('Unpaid expenses for appartment ' + req.params.appartmentId);
    });

    app.get('/current-expenses', (req, res) => {
        res.send('Current expenses');
    });

    app.get('/current-expenses/:expenseId', (req, res) => {
        res.send('Current expense with id', req.params.expenseId);
    });

    app.get('/sign-up', (req, res) => {
        res.send('Sign up');
    });

    app.get('/login', (req, res) => {
        res.send('Login');
    });

    app.get('/admin', (req, res) => {
        res.send('Admin page');
    });

    app.get('/create-expense', (req, res) => {
        res.send('Create expense page');
    });

    app.get('/my-appartment', (req, res) => {
        res.send('My appartment page');
    });

    app.get('/chat', (req, res) => {
        res.send('Chat page');
    });
};

module.exports = { attachTo };
