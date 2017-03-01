const input = process.argv.length === 5 && process.argv.splice(2, 3);

if(!input){
  throw new Error('Please provide data in format: <firstname> <lastname> <YYYY/MM/DD>');
}

const settings = require('./knex-config');
const knex = require('knex')(settings);

const dbDisplay = require('./lib/db-display')(input);
const db = require('./lib/db-helpers')(knex, dbDisplay);

const params = {
  row: {'first_name': input[0], 'last_name': input[1], 'birthdate': new Date(input[2])}
};

db.addPerson(params);