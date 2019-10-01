/* eslint-disable security/detect-object-injection */
const debug = require('debug')('knexconfig:log');
const knex = require('knex');
const knexfile = require('../knexfile');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const knexConfig = knex(knexfile[env]);

knexConfig.migrate
    .latest()
    .then(() => {
        debug('Start seeding');
        const seeds = knexConfig.seed.run();
        debug('Finish seeding');
        return seeds;
    })
    .then(() => {
        debug('Migrations finished');
    })
    .catch(err => {
        debug(err);
    });

module.exports = knexConfig;
