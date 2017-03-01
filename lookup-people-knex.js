const input = process.argv.length === 3 && process.argv[2];

if(!input){
  throw new Error('Please enter a first OR a last name');
}

const settings = require('./knex-config');
const knex = require('knex')(settings);

const dbDisplay = require('./lib/db-display')(input);
const db = require('./lib/db-helpers')(knex, dbDisplay);

const params = {
  select: ['first_name', 'last_name', 'birthdate'],
  from: 'famous_people',
  where: { first: {'first_name': input}, last: {'last_name': input} }
};

db.queryFirstOrLast(params);