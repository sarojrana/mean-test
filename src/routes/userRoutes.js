const express = require('express')
const userController = require('../controllers/userController')

const userRouter = express.Router()

userRouter.get('/', userController.getUsers)

userRouter.get('/:id', userController.userDetail)

userRouter.post('/', userController.createUser)

userRouter.put('/:id', userController.modifyUser)

userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter
