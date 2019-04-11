const auth = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Login = require('../models/Login');

auth.use((req, res, next) => {
  const token = req.headers['token'];
  
  if(!token){ throw 'token is missing in header'; }
  jwt.verify(token, config.SECRET, (err, decoded) => {
    if(err){ throw next(err); }
    else {
      req.body.LOGIN_ID = decoded.id;
      Login.findOne({ token: token }).then(result => {
        if(result) { next(); }
        else { throw { name: 'UnauthorizedError' } };
      }).catch( err => { next(err) });
    }
  });
});

module.exports = auth;
