/* eslint-disable max-len */

const { expect } = require('chai');
const sinon = require('sinon');
const index = require('../../../../app/controllers');

describe('Controllers Index Tests', () => {
    it('test me', () => {
        expect(index).to.be.an('object');
    });
});
