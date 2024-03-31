const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const session = await User.startSession();
  session.startTransaction();
  try {
    const { name, email, password, address, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, email, password, address, phone });
    await newUser.save({ session });

    const responseToken = jwt.sign(
      { userId: newUser._id, iat: Date.now() },
      process.env.SECRET_KEY,
    );

    // Send successful registration response or perform additional actions
    await session.commitTransaction();
    res.status(201).json({ message: 'User registered successfully', token: responseToken });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    res.status(500).json({ message: 'Server error' });
  } finally {
    session.endSession();
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const responseToken = jwt.sign(
      { userId: user._id, iat: Date.now() },
      process.env.SECRET_KEY,
    );

    res.status(200).json({ message: 'Login successful', token: responseToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
