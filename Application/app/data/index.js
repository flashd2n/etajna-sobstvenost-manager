const RequestsData = require('./requests.data');
const ApartmentsData = require('./apartments.data');
const AdminData = require('./admin.data');
const ExpensesData = require('./expense.data');
const FeesData = require('./fee.data');

const init = (database, models, validators) => {
    console.log(models);
    console.log(validators);
    return Promise.resolve({
        db: database,
        requests: new RequestsData(database, models.requests,
            validators.requestValidator),
        apartments: new ApartmentsData(database, models.apartments,
            validators.apartmentValidator),
        admin: new AdminData(database, models.admin,
            validators.managerValidator),
        expenses:
            new ExpensesData(database, models.expenses,
                validators.expenseValidator),
        fees: new FeesData(database, models.fees,
                validators.feeValidator),
    });
};

module.exports = { init };
