const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 'a7C;i3h@',
    host: 'localhost',
    port:5432,
    database: 'gymmanager'
})