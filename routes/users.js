const router = require('express').Router();
const controller = require('../controller/users');
const { updateUserValidator } = require('../middlewares/validators');

router.get('/me', controller.getMe);
router.patch('/me', updateUserValidator, controller.updateUser);

module.exports = router;
