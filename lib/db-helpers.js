module.exports = function make(knex, display) {

  return {
    queryFirstOrLast:
      q => {
        knex.select(q.select)
            .from(q.from)
            .where(q.where.first)
            .orWhere(q.where.last)
            .asCallback((err, results) => {
              if(err) {
                console.error(err);
              }
              if(results.length) {
                display.queryFirstOrLast.success(results);
              } else {
                display.queryFirstOrLast.empty();
              }
              knex.destroy();
            });
      },
    addPerson:
      i => {
        knex('famous_people').insert(i.row)
            .asCallback((err, results) => {
              if(err) {
                console.error(err);
              }
              if(results.rowCount) {
                display.addPerson.success();
              } else {
                display.addPerson.empty();
              }
              knex.destroy();
            });
      }
  };

};