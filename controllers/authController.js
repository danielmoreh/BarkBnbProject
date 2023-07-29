const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
        const token = signToken(newUser._id);
        res.status(200).json({
            status: 'success',
            token,
            data: {
                newUser
            }
        });
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            res.status(400).json({
                status: 'fail',
                message: 'This email is already in use. Please use a different email.',
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: err,
            });
        }
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password!',
            });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password',
            });
        }

        const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};



