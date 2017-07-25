const RequestsData = require('./requests.data');
const ApartmentsData = require('./apartments.data');
const AdminData = require('./admin.data');

const init = (database, validators) => {
    return Promise.resolve({
        db: database,
        requests: new RequestsData(database,
            validators.requestValidator),
        apartments: new ApartmentsData(database,
            validators.apartmentValidator),
        admin: new AdminData(database,
            validators.managerValidator),
    });
};

module.exports = { init };
