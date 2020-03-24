const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const AuthRouter = require('../auth/auth-router');
const UserRouter = require('../users/users-router');
const restricted = require('../auth/restricted-middleware');
const db = require('../data/dbConfig');

const server = express();

const sessionConfig = {
  name: 'user_session',
  secret: process.env.COOKIE_SECRET || "Dean, what's the password?",
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour session
    secure: process.env.COOKIE_SECURE || true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: process.env.SAVE_UNINITIALIZED || true,
  store: new KnexSessionStore({
    tablename: 'session',
    sidfieldname: 'sid',
    knex: db,
    createtable: true,
    clearInterval: 1000 * 60 * 60 // Every hour remove expired session
  })
};

server.use(express.json());
server.use(helmet());
server.use(session(sessionConfig));

server.use('/api/auth', AuthRouter);
server.use('/api/users', restricted, UserRouter);

module.exports = server;