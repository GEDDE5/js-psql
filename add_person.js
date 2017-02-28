const input = process.argv.length === 5 && process.argv.splice(2, 3);

if(!input){
  console.error('Error: Please provide a first or last name');
  throw err;
}

settings = require('./knex-config');
const knex = require('knex')(settings);

