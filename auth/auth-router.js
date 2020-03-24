const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;

  Users.add(newUser)
    .then(user => {
      const token = generateToken(user);

      res.status(201).json({ user, token });
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be registered", error });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username }).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      };
    })
    .catch(error => {
      res.status(500).json({ message: "Uanble to log in", error });
    });
});

router.get('/logout', (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    res.status(200).json({ message: "Successfully logged out" });
  } else {
    res.status(500).json({ message: "Already logged out" });
  };
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;