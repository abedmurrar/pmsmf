const knex = require('knex');
const knexfile = require('../knexfile');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const knexConfig = knex(knexfile[env]);

module.exports = knexConfig;
