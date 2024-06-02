const express = require('express');
const router = express.Router();
const { updateHomeAddress, registerUser, authUser, changePassword } = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/change-password', changePassword);
router.post('/update-home-address', updateHomeAddress);


module.exports = router;


