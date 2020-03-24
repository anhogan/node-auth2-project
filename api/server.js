const express = require('express');
const helmet = require('helmet');

const AuthRouter = require('../auth/auth-router');
const UserRouter = require('../users/users-router');
const restricted = require('../auth/restricted-middleware');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/auth', AuthRouter);
server.use('/api/users', restricted, UserRouter);

module.exports = server;