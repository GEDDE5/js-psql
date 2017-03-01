module.exports = function(input) {
  return {
    queryFirstOrLast: {
      empty:
        () => {
          let message = `Found 0 person(s) by the name '${input}'`;
          console.log(message);
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
    addPerson: {
      empty:
        () => {
          let message = `Error: results empty`;
          console.log(message);
        },
      success:
        () => {
          console.log(' => Success: Inserted 1 new row into database');
        }
    }
  };
};
