/* eslint-disable no-console */
const knex = require('knex');
const knexfile = require('../knexfile');
const debug = require('debug')('knexconfig:log');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const knexConfig = knex(knexfile[env]);

knexConfig.migrate
    .latest()
    .then(() => {
        return knexConfig.seed.run();
    })
    .then(() => {
        debug('Migrations finished')
    })
    .catch(err => {
        console.error(err);
    });

module.exports = knexConfig;
