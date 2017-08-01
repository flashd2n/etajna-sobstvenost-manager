/* eslint-disable max-len */
const { expect } = require('chai');
const Apartment = require('../../../../app/models/apartment.model');

describe('Apartment Model Tests', () => {
    const feeId = '4';
    const apt = {
        notPaidFees: [{ _id: 4 }],
        paidFees: [],
        notPaidExpenses: [{ _id: 4 }],
        paidExpenses: [],
    };

    it('payFee should return apt with correct collections', () => {
        const model = new Apartment();
        expect(typeof model).to.equal('object');
        const result = Apartment.payFee(apt, feeId);
        expect(result.notPaidFees).to.have.length(0);
        expect(result.paidFees).to.have.length(1);
    });

    it('payFee should return apt with correct collections', () => {
        const result = Apartment.payExpense(apt, feeId);
        expect(result.notPaidExpenses).to.have.length(0);
        expect(result.paidExpenses).to.have.length(1);
    });

    it('getDebt should return correct apt debt', () => {
        const aptTwo = {
            notPaidFees: [{ cost: 4 }],
            notPaidExpenses: [{ cost: 4 }],
        };
        const result = Apartment.getDebt(aptTwo);
        expect(result).to.equal(8);
    });
});
