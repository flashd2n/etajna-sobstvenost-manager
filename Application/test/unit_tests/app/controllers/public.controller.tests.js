/* eslint-disable max-len */

const { expect } = require('chai');
const sinon = require('sinon');
const PublicController = require('../../../../app/controllers/server/public.controller');

describe('Public Controller Tests', () => {
    let data = null;
    let req = null;
    let res = null;
    let controller = null;
    let next = null;

    const apartments = [];
    const apartment = {
        number: 42,
    };
    const posapts = [];

    beforeEach(() => {
        req = {
            user: {
                type: 'admin',
            },
            body: {
                username: 'ivan',
                appartment_id: '28',
                password: '1234',
            },
            flast: sinon.stub(),
        };

        res = {
            render: sinon.stub(),
            redirect: sinon.stub(),
        };

        next = sinon.stub();

        data = {
            apartments: {
                getUnregistered: sinon.stub().returns(Promise.resolve(apartments)),
                getPOSApartments: sinon.stub().returns(Promise.resolve(posapts)),
                getById: sinon.stub().returns(Promise.resolve(apartment)),
                getNumbersAndDebt: sinon.stub().returns(Promise.resolve(apartments)),
            },
            expenses: {
                getPendingExpenses: sinon.stub().returns(Promise.resolve()),
                getCompletedExpenses: sinon.stub().returns(Promise.resolve()),
            },
        };

        controller = new PublicController(data);
    });

    describe('Home tests', () => {
        it('Should call res.render with correct args', () => {
            const expectedRender = { loggedUser: req.user, page: 'home' };
            controller.home(req, res);
            expect(res.render.callCount).to.equal(1);
            expect(res.render.calledWith('home', expectedRender)).to.equal(true);
        });
    });

    describe('Page Of Shame tests', () => {
        it('Should call getNumbersAndDebt once', (done) => {
            Promise.resolve()
                .then(() => {
                    controller.pageOfShame(req, res);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(data.apartments.getNumbersAndDebt.callCount).to.equal(1);
                    done();
                });
        });

        it('Should call res.render with correct args', (done) => {
            const expectedRender = {
                loggedUser: req.user,
                apartments,
                page: 'page_of_shame',
            };
            Promise.resolve()
                .then(() => {
                    controller.pageOfShame(req, res);
                    return;
                })
                .then(() => {
                    return Promise.resolve();
                })
                .then(() => {
                    expect(res.render.callCount).to.equal(1);
                    expect(res.render.calledWith('page_of_shame', expectedRender)).to.equal(true);
                    done();
                });
        });

    });

    describe('notPaidApartmentExpenses tests', () => {
        it('should call res.render with correct args', () => {
            const req = {
                user: {
                    type: 'admin',
                },
                body: {
                    username: 'ivan',
                    appartment_id: '28',
                    password: '1234',
                },
                flast: sinon.stub(),
                params: {
                    apartmentId: 5,
                },
            };
            const currentApt = {}
            const expectedRender = {
                loggedUser: req.user,
                currentApartment: currentApt,
                page: 'page_of_shame',
            };
            Promise.resolve()
                .then(() => {
                    controller.notPaidApartmentExpenses(req, res);
                    return;
                })
                .then(() => {
                    expect(res.render.callCount).to.equal(1);
                    expect(res.render.calledWith('unpaid_apartment_expenses', expectedRender)).to.equal(true);
                });

        });
    });
});
