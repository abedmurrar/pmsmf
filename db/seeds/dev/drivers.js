/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const carClasses = ['A', 'B', 'C'];
const pushTypes = ['REAR', 'FRONT', '4x4'];

const createFakeCar = () => ({
    manufacturer: faker.company.bsNoun(),
    model: faker.random.alphaNumeric(3),
    car_class: faker.random.arrayElement(carClasses),
    push_type: faker.random.arrayElement(pushTypes)
});
exports.seed = function(knex) {
    // Deletes ALL existing entries

    // const fakeCars = [];
    // const desiredFakeCars = 100;
    // for (let i = 0; i < desiredFakeCars; i++) {
    //     fakeCars.push(createFakeCar());
    // }
    // return knex('cars').insert(fakeCars);
    // .del()
    // .then(function() {
    //     // Inserts seed entries
    //     return knex('cars').insert([
    //         { id: 1, manufacturer: 'SEAT', model: 'IBIZA', car_class: 'A', push_type: 'Front' },
    //         { id: 2, manufacturer: 'BMW', model: 'E30', car_class: 'A', push_type: 'REAR' },
    //         {
    //             id: 3,
    //             manufacturer: 'MERCEDES',
    //             model: 'C180',
    //             car_class: 'A',
    //             push_type: 'REAR'
    //         }
    //     ]);
    // });
};
