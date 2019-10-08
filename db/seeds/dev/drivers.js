/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const { Car } = require('../../../models');

const getMinMaxCarID = async () => {
    const values = await Car.query()
        .select([
            Car.query()
                .min('id')
                .as('min'),
            Car.query()
                .max('id')
                .as('max')
        ])
        .first();
    return values;
};

const createFakeDriver = (min, max) => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    nationality: faker.address.country(),
    address: faker.address.streetAddress(),
    id_card_no: faker.random.number({ min: 100000000, max: 999999999 }),
    mobile: faker.phone.phoneNumber('059#######'),
    email: faker.internet.email(),
    sponsor: faker.company.companyName(),
    car_id: faker.random.number({
        min,
        max
    })
});
exports.seed = function(knex) {
    // return getMinMaxCarID()
    //     .then(({ min, max }) => {
    //         const fakeDrivers = [];
    //         const desiredFakeDrivers = 150;
    //         for (let i = 0; i < desiredFakeDrivers; i++) {
    //             fakeDrivers.push(createFakeDriver(min, max));
    //         }
    //         return fakeDrivers;
    //     })
    //     .then(drivers => {
    //         return knex('drivers').insert(drivers);
    //     });
};
