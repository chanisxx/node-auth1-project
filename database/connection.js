const knex = require('knex');

const knexfile = require('../knexfile');
const environment = process.env.NODE.ENV || 'development';

module.exports = knex(knexfile[environment]);