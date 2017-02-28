const pg = require('pg');

const config = {
  user: 'test',
  database: 'navy',
  password: 'secret'
};

const client = new pg.Client(config);

client.connect((err, result) => {
  if(err){
    return console.error('Connection error:', );
  }
  let query = 'SELECT sailors.name FROM ships JOIN assignments ON ship_id = ships.id JOIN sailors ON sailor_id = sailors.id WHERE ships.name = \'Slacker\'';
  client.query(query, (err, result) => {
    if(err) {
      console.error('Error running query: ', err);
    }
    console.log(result.rows);
    client.end(err => {
      if(err) {
        throw err;
      }
    });

  });
});