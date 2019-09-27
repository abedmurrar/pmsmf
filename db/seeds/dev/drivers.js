/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const createFakeDriver = () => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    nationality: faker.address.country(),
    address: faker.address.streetAddress(),
    id_card_no: faker.random.number({ min: 100000000, max: 999999999 }),
    mobile: faker.phone.phoneNumber('059#######'),
    email: faker.internet.email(),
    sponsor: faker.company.companyName(),
    car_id: faker.random.number({ min: 1, max: 100 })
});
exports.seed = function(knex) {
    // const fakeDrivers = [];
    // const desiredFakeDrivers = 100;
    // for (let i = 0; i < desiredFakeDrivers; i++) {
    //     fakeDrivers.push(createFakeDriver());
    // }
    // return knex('drivers').insert(fakeDrivers);
};
