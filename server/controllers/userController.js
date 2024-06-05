const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = new User({
        username,
        email,
        password
    });

    try {
        await user.save();
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            homeAddress: "",
            favouriteFacility: {},
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};


const authUser = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            homeAddress: user.homeAddress,
            favouriteFacility: {},
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email/username or password');
    }
});


const changePassword = asyncHandler(async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (user && (await bcrypt.compare(currentPassword, user.password))) {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ success: true, message: 'Password changed successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid current password' });
    }
});


const updateHomeAddress = asyncHandler(async (req, res) => {
    const { userId, homeAddress } = req.body;

    const user = await User.findById(userId);

    if (user) {
        user.homeAddress = homeAddress;
        await user.save();
        res.status(200).json({
            success: true,
            homeAddress: user.homeAddress,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


module.exports = {
    registerUser,
    authUser,
    changePassword,
    updateHomeAddress,
    deleteUser
};
