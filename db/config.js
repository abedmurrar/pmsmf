'use strict'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile[env])


module.exports = knex