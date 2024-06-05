const express = require('express');
const router = express.Router();
const { updateHomeAddress, registerUser, authUser, changePassword, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/change-password', protect, changePassword);
router.post('/update-home-address', protect, updateHomeAddress);
router.delete('/:id', protect, deleteUser);


module.exports = router;


