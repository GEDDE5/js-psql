const input = process.argv.length === 3 && process.argv[2];

if(!input){
  console.error('Error: Please provide a first or last name');
}

settings = require('./knex-config');
const knex = require('knex')(settings);

function notify(result) {

  const display = {
    empty:
      () => {
        if(!result.length) {
          console.log(`Found ${result.length} person(s) by the name '${input}'`);
          return true;
        } else {
          return false;
        }
      },
    success:
      () => {
        console.log(`Found ${result.length} person(s) by the name '${input}':`);
        for(row of result) {
          const born = row.birthdate.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
          console.log(` => ${row.first_name} ${row.last_name}, born '${born}'`);
        }
      }
  };

  display.empty() || display.success();

}

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
            notify(results);
            knex.destroy();
          });
    }
};

const params = {
  select: ['first_name', 'last_name', 'birthdate'],
  from: 'famous_people',
  where: { first: {'first_name': input}, last: {'last_name': input} }
};

db.query(params);
