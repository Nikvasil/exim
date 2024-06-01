const express = require('express');
const router = express.Router();
const { registerUser, authUser, changePassword } = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/change-password', changePassword);


module.exports = router;


