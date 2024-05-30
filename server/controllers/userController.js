const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


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

    const user = new User({ username, email, password });
    console.log(user);

    try {
        await user.save();
        res.status(201).json({
            _id: user._id,
            username: user.username,
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
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email/username or password');
    }
});


const updateUser = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.favoriteFacility = req.body.favoriteFacility || user.favoriteFacility;
        user.homeAddress = req.body.homeAddress || user.homeAddress;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            favoriteFacility: updatedUser.favoriteFacility,
            homeAddress: updatedUser.homeAddress,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


module.exports = {
    registerUser,
    authUser,
    updateUser,
};
