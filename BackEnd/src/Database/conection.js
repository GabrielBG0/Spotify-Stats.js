
const knex = require('knex')
const configuration = require('../../knexfile')

const connecton = knex(configuration.development)

module.exports = connecton