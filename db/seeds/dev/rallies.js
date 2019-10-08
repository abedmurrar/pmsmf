/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const { RALLY_TYPES } = require('../../../models');

const createFakeRally = () => ({
    name: faker.name.firstName(),
    city: faker.address.city(),
    date: faker.date.past(),
    type: faker.random.arrayElement(RALLY_TYPES)
});
exports.seed = function(knex) {
    // const fakeRallies = [];
    // const desiredFakeRallies = 100;
    // for (let i = 0; i < desiredFakeRallies; i++) {
    //     fakeRallies.push(createFakeRally());
    // }
    // return knex('rallies').insert(fakeRallies);
};
