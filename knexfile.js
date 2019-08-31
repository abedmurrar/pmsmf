/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const path = require('path');
const debug = require('debug')('knexfile:log');

module.exports = {
    development: {
        client: 'mysql',
        debug: true,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            port: process.env.DB_PORT
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
                if (Array.isArray(message)) {
                    message.forEach(object => {
                        debug(
                            '\x1b[36m',
                            '\x1b[40m',
                            object.sql,
                            ' \x1b[32m',
                            object.bindings,
                            '\x1b[0m'
                        );
                    });
                } else {
                    debug(
                        '\x1b[36m',
                        '\x1b[40m',
                        message.sql,
                        ' \x1b[32m',
                        message.bindings,
                        '\x1b[0m'
                    );
                }
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
