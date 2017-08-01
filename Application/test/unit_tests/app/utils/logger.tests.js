/* eslint-disable max-len */
const { expect } = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const Logger = rewire('../../../../utils/logger');

describe('Logger Tests', () => {
    let config = null;
    let consoleStub = null;
    let logger = null;

    beforeEach(() => {
        consoleStub = {
            log: sinon.stub(),
        };

        Logger.__set__('console', consoleStub);

        config = {
            dev: 'dev',
            prod: 'prod',
            env: 'dev',
        };

        logger = new Logger(config);
    });

    it('log should output the message to the console when in dev', () => {
        logger.log('hello');
        expect(consoleStub.log.callCount).to.equal(1);
    });
});
