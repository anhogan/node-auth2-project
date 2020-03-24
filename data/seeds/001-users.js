
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'batman', password: 'iam', department: 'Marketing'},
        {id: 2, username: 'sparta', password: 'dog', department: 'Security'},
        {id: 3, username: 'Panic!atTheDisco', password: 'jammingallday', department: 'Marketing'}
      ]);
    });
};
