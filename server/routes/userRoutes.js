const express = require('express');
const router = express.Router();
const {
    registerUser, authUser, deleteUser, changePassword, updateHomeAddress, addFavourite, removeFavourite,
} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/change-password', protect, changePassword);
router.post('/update-home-address', protect, updateHomeAddress);
router.post('/set-favourite', protect, addFavourite);
router.post('/remove-favourite', protect, removeFavourite);
router.delete('/:id', protect, deleteUser);


module.exports = router;


