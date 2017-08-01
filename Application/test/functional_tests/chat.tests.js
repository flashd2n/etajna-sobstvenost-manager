/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const config = require('./utils/config');
const seedAndStartServer = require('./utils/start_server');

describe('Chat tests', () => {
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
            .then(() => ui.click('#chat-nav'))
            .then(() => ui.waitSeconds(1));
    });

    after(() => {
        return driver.quit()
            .then(() => runningApp.close());
    });

    it('Expect chat message to appear',
        (done) => {
        Promise.resolve()
            .then(() => ui.setValue('#message', 'hello, asl'))
            .then(() => ui.click('button[type=submit]'))
            .then(() => ui.waitSeconds(1))
            .then(() => ui.getTexts('div.messages p'))
            .then((messages) => {
                expect(messages).to.contain('apt1: hello, asl');
                done();
            })
            .catch(done);
    });
});
