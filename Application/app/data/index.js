const RegistrationRequestsData = require('./registrationrequests.data');
const AppartmentsData = require('./appartments.data');
const ManagerData = require('./manager.data');

const init = (database) => {
    return Promise.resolve({
        db: database,
        registrationRequests: new RegistrationRequestsData(database),
        appartments: new AppartmentsData(database),
        manager: new ManagerData(database),
    });
};

module.exports = { init };
