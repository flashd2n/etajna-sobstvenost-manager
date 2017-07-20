const AppartmentsData = require('./appartments.data');

const init = (database) => {
    return Promise.resolve({
        appartments: new AppartmentsData(database),
    });
};

module.exports = { init };
