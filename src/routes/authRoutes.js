const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

authRouter.post('/login', authController.login);

authRouter.post('/logout', auth, authController.logout);

authRouter.post('/', authController.createLogin);

module.exports = authRouter;
