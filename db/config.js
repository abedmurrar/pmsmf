/* eslint-disable no-console */
const knex = require('knex');
const knexfile = require('../knexfile');
const debug = require('debug')('knexconfig:log');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const knexConfig = knex(knexfile[env]);

knexConfig.migrate
    .latest()
    .then(() => {
        console.log('Start seeding');
        const seeds = knexConfig.seed.run();
        console.log('Finish seeding');
        return seeds;
    })
    .then(() => {
        debug('Migrations finished');
    })
    .catch(err => {
        console.error(err);
    });

module.exports = knexConfig;
