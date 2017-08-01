/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const config = require('./utils/config');
const seedAndStartServer = require('./utils/start_server');

describe('Public tests', () => {
    let driver;
    let runningApp;
    const appUrl = `http://localhost:${config.port}`;

    before(() => {
        return seedAndStartServer()
            .then((app) => {
                runningApp = app;
                driver = setupDriver('chrome');
                ui.setDriver(driver);
                return Promise.all([driver.get(appUrl), ui.waitSeconds(3)])
                    .then(([drv, _]) => {
                        return drv;
                    });
            });
    });

    after(() => {
        return driver.quit()
            .then(() => runningApp.close());
    });

    describe('Home page data', () => {
        it('Total unpaid sum should be 19800 with seeded data.', () => {
            Promise.resolve()
                .then(() => ui.getText('#totalDebt'))
                .then((text) => {
                    expect(text).to.contain('19800');
                });
        });

        it('Total number of debtors shoud be 18 with seeded data.', (done) => {
            Promise.resolve()
                .then(() => ui.getText('#totalDebtors'))
                .then((text) => {
                    expect(text).to.contain('18');
                    done();
                })
                .catch(done);
        });

        it('Total number of current expenses should be 3 with seeded data.',
            (done) => {
            Promise.resolve()
                .then(() => ui.getText('#expensesCount'))
                .then((text) => {
                    expect(text).to.contain('3');
                    done();
                })
                .catch(done);
        });
    });

    describe('Page of shame data', () => {
        before(() => {
            return ui.click('#pos-nav').then(() => ui.waitSeconds(1));
        });

        it('Number of apartments in the list '
            + 'should be 18 with seeded data',
            (done) => {
            Promise.resolve()
                .then(() => ui.waitForMany('div.list-group'))
                .then((rows) => {
                    expect(rows.length).to.equal(18);
                    done();
                })
                .catch(done);
        });

        it('Sum of debts should be 19800 with seeded data',
            (done) => {
            Promise.resolve()
                .then(() => ui.getTexts('div.list-group .debt-value'))
                .then((debtAmounts) => {
                    const sum = debtAmounts.reduce((prev, cur) =>
                        +prev + +cur);
                    expect(sum).to.equal(19800);
                    done();
                })
                .catch(done);
        });
    });

    describe('Expenses data', () => {
        before(() => {
            return ui.click('#expenses-nav').then(() => ui.waitSeconds(1));
        });

        it('Page should contain three 500 value expenses',
            (done) => {
            Promise.resolve()
                .then(() => ui.getTexts('.pending-expense-cost'))
                .then((expenseCosts) => {
                    expect(expenseCosts.length).to.equal(3);
                    expect(expenseCosts).to.deep.equal(['500', '500', '500']);
                    done();
                })
                .catch(done);
        });

        it('Page should contain two 500 value completed expenses',
            (done) => {
            Promise.resolve()
                .then(() => ui.getTexts('.completed-expense-cost'))
                .then((expenseCosts) => {
                    expect(expenseCosts.length).to.equal(2);
                    expect(expenseCosts).to.deep.equal(['500', '500']);
                    done();
                })
                .catch(done);
        });
    });

    describe('Sign up form', () => {
        before(() => {
            return ui.click('#register-nav').then(() => ui.waitSeconds(1));
        });

        it('Apt select should contain 26 unregistered apts.',
            (done) => {
            Promise.resolve()
                .then(() => ui.getTexts('#apartment_id option'))
                .then((aptOptions) => {
                    expect(aptOptions.length).to.equal(26);
                    done();
                })
                .catch(done);
        });

        it('Admin username should be rejected.',
            (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'InjTonchev'))
                .then(() => ui.setValue('#password', '1234'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.getTexts('#messages li'))
                .then((texts) => {
                    expect(texts).to.contain('Username already exists');
                    done();
                })
                .catch(done);
        });

        it('apt1 username should be rejected.',
            (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'apt1'))
                .then(() => ui.setValue('#password', '1234'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.getTexts('#messages li'))
                .then((texts) => {
                    expect(texts).to.contain('Username already exists');
                    done();
                })
                .catch(done);
        });

        it('apt25 username should be rejected (seeded in requests.',
            (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'apt1'))
                .then(() => ui.setValue('#password', '1234'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.getTexts('#messages li'))
                .then((texts) => {
                    expect(texts).to.contain('Username already exists');
                    done();
                })
                .catch(done);
        });

        it('novUser username should be accepted.',
            (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'novUser'))
                .then(() => ui.setValue('#password', '1234'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.getTexts('#messages li'))
                .then((texts) => {
                    expect(texts).to.contain('Thanks for registering. '
                        + 'You will be able to login once the manager '
                        + 'has approved your request.');
                    done();
                })
                .catch(done);
        });
    });

    describe('Log in form', () => {
        before(() => {
            return ui.click('#login-nav').then(() => ui.waitSeconds(1));
        });

        it('InvalidUsername should be rejected.',
            (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'InvalidUsername'))
                .then(() => ui.setValue('#password', '1234'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.getTexts('#messages li'))
                .then((texts) => {
                    expect(texts).to.contain('Invalid login credentials!');
                    done();
                })
                .catch(done);
        });

        it('Invalid admin password should be rejected.',
            (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'InjTonchev'))
                .then(() => ui.setValue('#password', '12345'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.getTexts('#messages li'))
                .then((texts) => {
                    expect(texts).to.contain('Invalid login credentials!');
                    done();
                })
                .catch(done);
        });

        it('Invalid apt1 password should be rejected.',
            (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'apt1'))
                .then(() => ui.setValue('#password', '12345'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.getTexts('#messages li'))
                .then((texts) => {
                    expect(texts).to.contain('Invalid login credentials!');
                    done();
                })
                .catch(done);
        });

        it('Expect InjTonchev to log in with correct password.', (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'InjTonchev'))
                .then(() => ui.setValue('#password', '1234'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.waitSeconds(2))
                .then(() => ui.getTexts('#nav-controls-container li'))
                .then((texts) => {
                    expect(texts).to.contain('Admin');
                    return ui.click('#logout-nav');
                })
                .then(() => ui.click('#login-nav').then(() =>
                    ui.waitSeconds(1)))
                .then(() => done())
                .catch(done);
        });

        it('Expect apt1 to log in with correct password.', (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#username', 'apt1'))
                .then(() => ui.setValue('#password', '1234'))
                .then(() => ui.click('button[type=submit]'))
                .then(() => ui.waitSeconds(2))
                .then(() => ui.getTexts('#nav-controls-container li'))
                .then((texts) => {
                    expect(texts).to.contain('My apartment');
                    return ui.click('#logout-nav');
                })
                .then(() => done())
                .catch(done);
        });
    });
});
