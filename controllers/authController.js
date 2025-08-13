const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

exports.register = async (req, res) => {
    const { userId, name, email, role, password } = req.body;
    const user = new User({ userId, name, email, role, password});
    await user.save();
    res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
   try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid credentials'})
        }
        const token = generateToken(user);
        res.status(200).json({user,token});
    } catch(err){
        res.status(400).json({error: err.message})
    };
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

exports.getUsersByName = async (req, res) => {
 const nameQuery = req.params.name;
  const users = await User.find({ name: { $regex: new RegExp(`^${nameQuery}$`, 'i') } });
  res.json(users);

};

exports.getUsersByRole = async (req, res) => {
    const users = await User.find({ role: req.params.role });
    res.json(users);
};

exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
    const message = `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 10 minutes.</p>`;

    try {
        await sendEmail(user.email, 'Password Reset', message);
        res.status(200).json({ message: 'Reset email sent' });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500).json({ error: 'Email failed to send' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Token is invalid or has expired' });
        }

        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


