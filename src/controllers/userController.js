const User = require('../models/User')
const httpStatus = require('../util/httpStatus')
const upload = require('../middleware/upload')
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

/**
 * register user
 */
exports.createUser = (req, res, next) => {
  console.log(req.headers['token'])
  upload(req, res, (err) => {
    if(err) { next(err) }
    else {
      let fullPath = null 
      if(req.file) {
        fullPath = 'images/' + req.file.filename;
      }

      const user = new User({
        image: fullPath,
        full_name: req.body.full_name,
        gender: req.body.gender,
        designation: req.body.designation,
        experiences: req.body.experiences,
        status: req.body.status
      })

      user.save().then((user) => {
        res.status(httpStatus.CREATED).json({
          status: true,
          data: user,
          message: 'Successfully registered'
        })
      }).catch((err) => {
        unlinkAsync(req.file.path)
        next(err)
      })
    }
  })
}

/**
 * get user list
 */
exports.getUsers = (req, res, next) => {
  console.log(req.headers['token'])
  const query = {}
  if(req.query.full_name) {
    query.full_name = req.query.full_name
  }
  if(req.query.gender) {
    query.gender = req.query.gender
  }
  if(req.query.designation) {
    query.designation = req.query.designation
  }
  if(req.query.status) {
    query.status = req.query.status
  }
  User.find(query).exec().then((users) => {
    users.forEach((user) => {
      if(user.image) {
        user.image = req.protocol + '://' + req.get('host') + '/' + user.image;
      } else { user.image = null }
    })
    res.json({
      status: true,
      data: users,
      message: 'Listed Successfully'
    })
  })
}

/**
 * get user detail
 */
exports.userDetail = (req, res, next) => {
  User.findById({ _id: req.params.id }).exec().then((user) => {
    if(user) {
      user.image = req.protocol + '://' + req.get('host') + '/' + user.image;
      res.status(httpStatus.OK).json({
        status: true,
        data: user,
        message: 'info successfully retrieved'
      })
    } else { throw 'user not found' }
  }).catch(err => next(err))
}

/**
 * update user
 */
exports.modifyUser = (req, res, next) => {
  upload(req, res, (err) => {
    if(err) { next(err) }
    else {
      const body = {}
      if(req.body.full_name) {
        body.full_name = req.body.full_name
      }
      if(req.body.gender) {
        body.gender = req.body.gender
      }
      if(req.body.designation) {
        body.designation = req.body.designation
      }
      if(req.body.status) {
        body.status = req.body.status
      }
      if(req.body.experiences) {
        body.experiences = req.body.experiences
      }
      if(req.file){
        body.image = 'images/' + req.file.filename;
      }
      console.log(body)
      User.findByIdAndUpdate(req.params.id, body, { new: true }).then((user) => {
        if(user) {
          res.status(httpStatus.OK).json({
            status: true,
            data: user,
            message: 'Successfully Updated'
          })
        } else { throw 'User not found' }
      })
    }
  })
}

/**
 * delete user
 */
exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id).exec().then((result) => {
    if(result) {
      if(result.image) {
        unlinkAsync('src/public/' + result.image)
      }
      res.status(httpStatus.OK).json({
        status: true,
        data: null,
        message: 'Successfully deleted'
      })
    } else { throw 'User does not exists' }
  }).catch((err) => next(err))
}
