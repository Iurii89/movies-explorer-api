const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const register = require('../controller/register');
const login = require('../controller/login');
const auth = require('../middlewares/auth');
const { registerValidator, loginValidator } = require('../middlewares/validators');

router.post('/signup', registerValidator, register);
router.post('/signin', loginValidator, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
