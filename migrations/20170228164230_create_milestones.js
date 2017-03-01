
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', table => {
      table.increments();
      table.string('description');
      table.timestamp('date_achieved');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ]);
};
