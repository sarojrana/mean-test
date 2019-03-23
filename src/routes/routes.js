const router = require('express').Router();
const userRouter = require('./userRoutes');
const http = require('../util/httpStatus');
const authRouter = require('./authRoutes');
const auth = require('../middleware/auth');

router.get('/api', function(req, res){
  res.status(http.OK).send({
    status: 'API working',
    message: 'Welcome to mean_test API!'
  });
});

router.use(authRouter);

/**
 * user routes
 * @function auth is middleware used for authentication
 */
router.use('/users', auth, userRouter);

module.exports = router;
