const AppartmentsData = require('./appartments.data');

const init = (database) => {
    return Promise.resolve({
        db: database,
        appartments: new AppartmentsData(database),
    });
};

module.exports = { init };
