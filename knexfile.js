/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const path = require('path');
const debug = require('debug')('knex_config');

module.exports = {
    development: {
        client: 'mysql',
        debug: true,
        connection: {
            host: '127.0.0.1',
            user: 'admin',
            password: '246805@Abed',
            database: 'pmsmf'
        },
        log: {
            warn(message) {
                debug(message);
                console.warn(message);
            },
            error(message) {
                debug(message);
                console.error(message);
            },
            deprecate(message) {
                debug(message);
                console.info(message);
            },
            debug(message) {
                debug(message);
                console.debug(message);
            }
        },
        migrations: {
            directory: path.join(__dirname, '/db/migrations/'),
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: path.join(__dirname, '/db/seeds/dev')
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            database: 'pmsmf',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.join(__dirname, '/db/migrations/'),
            tableName: 'migrations'
        },
        seeds: {
            directory: path.join(__dirname, '/db/seeds/prod')
        }
    }
};
