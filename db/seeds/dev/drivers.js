/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const carClasses = ['A', 'B', 'C'];
const pushTypes = ['REAR', 'FRONT', '4x4'];

const createFakeDriver = () => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
});
exports.seed = function(knex) {
    // Deletes ALL existing entries

    // const fakeDrivers = [];
    // const desiredFakeDrivers = 100;
    // for (let i = 0; i < desiredFakeDrivers; i++) {
    //     fakeDrivers.push(createFakeDriver());
    // }
    // return knex('drivers').insert(fakeDrivers);
    // .del()
    // .then(function() {console.log('jahez')})
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
