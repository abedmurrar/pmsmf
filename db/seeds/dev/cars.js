/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const carClasses = ['A', 'B', 'C'];
const pushTypes = ['R', 'F', '4'];
const motorCapacities = [
    '1600 T',
    '1400 T',
    '1200 T',
    '1800 T',
    '2000 T',
    '2500 T',
    '3000 T',
    '1600 CC',
    '1400 CC',
    '1200 CC',
    '1800 CC',
    '2000 CC',
    '2500 CC',
    '3000 CC'
];

const createFakeCar = () => ({
    manufacturer: faker.company.bsNoun(),
    model: faker.random.alphaNumeric(3),
    year_of_production: faker.random.number({ min: 1970, max: 2019 }),
    license_no: faker.random.number({ min: 1000000, max: 9999999 }),
    motor_capacity: faker.random.arrayElement(motorCapacities),
    car_class: faker.random.arrayElement(carClasses),
    push_type: faker.random.arrayElement(pushTypes)
});
exports.seed = function(knex) {
    // const fakeCars = [];
    // const desiredFakeCars = 100;
    // for (let i = 0; i < desiredFakeCars; i++) {
    //     fakeCars.push(createFakeCar());
    // }
    // return knex('cars').insert(fakeCars);
};
