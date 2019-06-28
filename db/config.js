var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'admin',
        password: '246805@Abed',
        database: 'pmsmf'
    }
});

module.exports = knex;