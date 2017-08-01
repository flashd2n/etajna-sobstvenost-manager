/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const config = require('./utils/config');
const seedAndStartServer = require('./utils/start_server');

describe('Admin tests', () => {
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
            })
            .then(() => ui.click('#login-nav'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.setValue('#username', 'InjTonchev'))
            .then(() => ui.setValue('#password', '1234'))
            .then(() => ui.click('button[type=submit]'))
            .then(() => ui.waitSeconds(2))
            .then(() => ui.click('#admin-nav'))
            .then(() => ui.waitSeconds(1));
    });

    after(() => {
        return driver.quit()
            .then(() => runningApp.close());
    });

    it('Expect 5 pending registration requests',
        (done) => {
        Promise.resolve()
            .then(() => ui.waitForMany('.requestRow'))
            .then((requests) => {
                expect(requests.length).to.equal(5);
                done();
            })
            .catch(done);
    });

    it('Page should contain three expenses',
        (done) => {
        Promise.resolve()
            .then(() => ui.getTexts('.pending-expense'))
            .then((expenseCosts) => {
                expect(expenseCosts.length).to.equal(3);
                done();
            })
            .catch(done);
    });

    it('Page should contain two completed expenses',
        (done) => {
        Promise.resolve()
            .then(() => ui.getTexts('.completed-expense'))
            .then((expenseCosts) => {
                expect(expenseCosts.length).to.equal(2);
                done();
            })
            .catch(done);
    });

    it('Rejecting request should print message and remove request',
        (done) => {
        Promise.resolve()
            .then(() => ui.click('a.reject'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.getTexts('#messages li'))
            .then((texts) => {
                expect(texts).to.contain('Registration rejected!');
            })
            .then(() => ui.waitForMany('.requestRow'))
            .then((requests) => {
                expect(requests.length).to.equal(4);
            })
            .then(() => ui.click('a.approve'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.getTexts('#messages li'))
            .then((texts) => {
                expect(texts).to.contain('Registration approved!');
            })
            .then(() => ui.waitForMany('.requestRow'))
            .then((requests) => {
                expect(requests.length).to.equal(3);
            })
            .then(() => {
                done();
            })
            .catch(done);
    });

    it('Canceling expense should remove 1 expense and add it to canceled',
        (done) => {
        Promise.resolve()
            .then(() => ui.click('a.cancel-expense'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.getTexts('.pending-expense'))
            .then((expenseCosts) => {
                expect(expenseCosts.length).to.equal(2);
            })
            .then(() => ui.getTexts('.canceled-expense'))
            .then((expenseCosts) => {
                expect(expenseCosts.length).to.equal(1);
                done();
            })
            .catch(done);
    });

    it('Monthly fee creation should print success message',
        (done) => {
        Promise.resolve()
            .then(() => ui.setValue('#month', '8'))
            .then(() => ui.setValue('#year', '2017'))
            .then(() => ui.setValue('#cost', '1'))
            .then(() => ui.click('button.createFee'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.getTexts('#messages li'))
            .then((texts) => {
                expect(texts).to.contain('Montly fee created!');
                done();
            })
            .catch(done);
    });

    it('Create new expense should create new expense',
        (done) => {
        Promise.resolve()
            .then(() => ui.click('a.newExpense'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.setValue('#name', 'newexpense'))
            .then(() => ui.setValue('#cost', '666'))
            .then(() => ui.setValue('#description', 'new expense description'))
            .then(() => ui.click('button.createExpense'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.getTexts('#messages li'))
            .then((texts) => {
                expect(texts).to.contain('Expense created!');
            })
            .then(() => ui.getTexts('.pending-expense a'))
            .then((expenseCosts) => {
                expect(expenseCosts).to.contain('newexpense');
            })
            .then(() => {
                done();
            })
            .catch(done);
    });
});
