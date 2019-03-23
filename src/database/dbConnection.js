const debug = require('debug')('app:dbConnection');
const Login = require('../models/Login');
const bcrypt = require('bcrypt');
const config = require('../config/config');

const saltRounds = config.SALT_ROUNDS;
const mongoDB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/mean_test';

const mongoose = require('mongoose').connect(mongoDB_URL, { useNewUrlParser: true})
  .then(() => {
    console.log('Successfully Connected to database!');
    const password = 'admin';
    return bcrypt.hash(password, saltRounds)
  })
  .then((hash) => {
    console.log('Successfully Connected to database!');
    const login = {
      email: 'admin@mail.com',
      password: hash,
    }
    return Login.findOneAndUpdate({ email: 'admin@mail.com' }, login, { upsert: true, new: true, setDefaultsOnInsert: true })
  }).then((login) => {
    if(login){
      console.log('Successfully Created');
    } else { throw 'Failed to create login' }
  }).catch(err => {
    console.log(err.message)
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
