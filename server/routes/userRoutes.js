const express = require('express');
const router = express.Router();
const { registerUser, authUser, updateUser } = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', authUser); 
router.put('/update', updateUser);


module.exports = router;

