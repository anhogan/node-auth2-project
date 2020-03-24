const router = require('express').Router();

const Users = require('../users/users-model');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user information could not be retrieved" });
    });
});

module.exports = router;