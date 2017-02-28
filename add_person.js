const input = process.argv.length === 5 && process.argv.splice(2, 3);

if(!input){
  throw Error('Error: Please provide data in following format:\n       <firstname> <lastname> <YYYY/MM/DD>');
}

settings = require('./knex-config');
const knex = require('knex')(settings);

const display = {
  query: {
    empty:
      () => {
        console.log(`Found 0 person(s) by the name '${input}'`);
      },
    success:
      results => {
        console.log(`Found ${results.length} person(s) by the name '${input}:'`);
        for(row of results) {
          const born = row.birthdate.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
          console.log(` => ${row.first_name} ${row.last_name}, born '${born}'`);
        }
      }
  },
  insert: {
    empty:
      () => {
        message = `Error: results empty`;
        console.log(message);
      },
    success:
      () => {
        console.log(' => Success: Inserted 1 row into database');
      }
  }
};



const db = {
  query:
    q => {
      knex.select(q.select)
          .from(q.from)
          .where(q.where.first)
          .orWhere(q.where.last)
          .asCallback((err, results) => {
            if(err) {
              console.error(err);
            }
            if(results.row) {
              display.query.success(results);
            } else {
              display.query.empty();
            }
            knex.destroy();
          });
    },
  insert:
    i => {
      knex('famous_people').insert(i.row)
          .asCallback((err, results) => {
            if(err) {
              console.error(err);
            }
            if(results.rowCount) {
              display.insert.success();
            } else {
              display.insert.empty();
            }
            knex.destroy();
          });
    }
};

const params = {
  row: {'first_name': input[0], 'last_name': input[1], 'birthdate': new Date(input[2])}
};

db.insert(params);
