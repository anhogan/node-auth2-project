const db = require('../data/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add
};

function find() {
  return db('users').select('id', 'username');
};

function findBy(filter) {
  return db('users').where(filter);
};

function findById(id) {
  return db('users').where(id).select('id', 'username').first();
};

function add(user) {
  return db('users').insert(user)
    .then(id => {
      return findById(id[0]);
    });
};