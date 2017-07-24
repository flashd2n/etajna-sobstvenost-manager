const RequestsData = require('./requests.data');
const AppartmentsData = require('./appartments.data');
const ManagerData = require('./manager.data');

const init = (database, validators) => {
    return Promise.resolve({
        db: database,
        requests: new RequestsData(database,
            validators.requestValidator),
        appartments: new AppartmentsData(database,
            validators.apartmentValidator),
        manager: new ManagerData(database,
            validators.managerValidator),
    });
};

module.exports = { init };
