const pg = require('pg');

const config = {
  user: 'test',
  database: 'famous_people',
  password: 'secret'
};

const input = process.argv.length === 3 && process.argv[2];

if(!input){
  console.error('Error: Please provide a first or last name');
}

const client = new pg.Client(config);

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
        console.log(`Found ${result.length} person(s) by the name '${input}:'`);
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
      client.connect(() => {
        client.query(q, [input], result => {
          notify(result.rows);
          client.end();
        });
      });
    }
};

db.query('SELECT first_name, last_name, birthdate FROM famous_people WHERE last_name=$1 OR first_name = $1');
