const fileController = require('../file/file.controller');
const userController = require('../user/user.controller');
const Router = require('express').Router;
const router = Router();

router.use('/files', fileController);
router.use('/users', userController);

module.exports = router;
