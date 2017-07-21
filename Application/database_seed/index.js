// This function is for seeding values that cannot be set through the interface
// These values are appartments and manager username and password
// If you, developer, need seeds for testing, please create 
// another function for that

const sha256 = require('sha256');
const Appartment = require('../app/models/appartment.model');

const managerUsername = 'Manager';
const managerPassword = 'I am the boss!';
const appartmentCount = 50;

const seedInitial = (data) => {
    const promises = [];
    for (let i = 1; i <= appartmentCount; i++) {
        const appartmentNameOrNumber = `app. ${i}`;
        promises.push(
            data.appartments.getByNameOrNumber(appartmentNameOrNumber)
            .then((appartment) => {
                if (appartment) {
                    console.log(`Appartment ${appartmentNameOrNumber} ` +
                    `already exists. Skipping`);
                    return Promise.resolve();
                }
                console.log(`Adding appartment ${appartmentNameOrNumber}.`);
                const newAppartment = new Appartment();
                newAppartment.appartmentNameOrNumber =
                    appartmentNameOrNumber;
                return data.appartments.create(newAppartment);
            })
        );
    }

    const managerHashedPassword = sha256(managerPassword);
    console.log(`Adding manager with username ${managerUsername}`
        + ` and password ${managerPassword}`);
    promises.push(data.manager
        .setUsernameAndPasswordHash(managerUsername, managerHashedPassword));
    return Promise.all(promises);
};

module.exports = { seedInitial };
