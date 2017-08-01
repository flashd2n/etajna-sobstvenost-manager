/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const config = require('./utils/config');
const seedAndStartServer = require('./utils/start_server');

describe('Apartment tests', () => {
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
            .then(() => ui.setValue('#username', 'apt1'))
            .then(() => ui.setValue('#password', '1234'))
            .then(() => ui.click('button[type=submit]'))
            .then(() => ui.waitSeconds(2))
            .then(() => ui.click('#apartment-nav'))
            .then(() => ui.waitSeconds(1));
    });

    after(() => {
        return driver.quit()
            .then(() => runningApp.close());
    });

    it('Expect 3 pending fees',
        (done) => {
        Promise.resolve()
            .then(() => ui.waitForMany('#fees tr button'))
            .then((fees) => {
                expect(fees.length).to.equal(3);
                done();
            })
            .catch(done);
    });

    it('Expect 3 pending expenses',
        (done) => {
        Promise.resolve()
            .then(() => ui.waitForMany('#expenses tr button'))
            .then((fees) => {
                expect(fees.length).to.equal(3);
                done();
            })
            .catch(done);
    });

    it('Expect 2 pending fees after pay is clicked',
        (done) => {
        Promise.resolve()
            .then(() => ui.click('#fees tr button'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.waitForMany('#fees tr button'))
            .then((fees) => {
                expect(fees.length).to.equal(2);
                done();
            })
            .catch(done);
    });

    it('Expect 2 expenses after pay is clicked',
        (done) => {
        Promise.resolve()
            .then(() => ui.click('#expenses tr button'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.waitForMany('#expenses tr button'))
            .then((fees) => {
                expect(fees.length).to.equal(2);
                done();
            })
            .catch(done);
    });
});
