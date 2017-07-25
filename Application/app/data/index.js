const RequestsData = require('./requests.data');
const ApartmentsData = require('./apartments.data');
const AdminData = require('./admin.data');
const ExpensesData = require('./expense.data');
const FeesData = require('./fee.data');

const init = (database, validators) => {
    return Promise.resolve({
        db: database,
        requests: new RequestsData(database,
            validators.requestValidator),
        apartments: new ApartmentsData(database,
            validators.apartmentValidator),
        admin: new AdminData(database,
            validators.managerValidator),
        expenses: new ExpensesData(database, validators.expenseValidator),
        fees: new FeesData(database, validators.feeValidator),
    });
};

module.exports = { init };
