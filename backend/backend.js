const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Global variable to temporarily store email
let tempEmail = null;
const isGmailEmail = (email) => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
};
// MongoDB connection
mongoose.connect(`mongodb+srv://elankumaran2103:Elan2005@cluster0.ox2vh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log(err));

// User schema definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date }
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elankumaranr.22cse@kongu.edu', // Your Gmail email address
    pass: 'elan2005', // Your Gmail password or app-specific password
  },
  connectionTimeout: 60000,
});
const User = mongoose.model('User', userSchema);
// Login route
app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Find user by email or username
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (!user) {
      return res.status(400).json({ message: 'User not found. Please check your username or email.' });
    }

    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password. Please try again.' });
    }

    // If everything is correct, return success message and user data
    res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error logging in. Please try again later.' });
  }
});

// Function to send OTP
const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: 'elankumaranr.22cse@kongu.edu',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!isGmailEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid Gmail address.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    // Store email temporarily
    tempEmail = email;

    // Create new user but do not save yet
    const newUser = new User({ username, email: tempEmail, password: hashedPassword, otp, otpExpires });
    newUser.save();
    // Send OTP to user's email
    await sendOtp(tempEmail, otp);

    res.status(201).json({ message: 'User created successfully. Check your email for the OTP.' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
    console.log(err);
  }
});

// OTP Verification Route
app.post('/api/verify-otp', async (req, res) => {
  const { otp } = req.body;

  try {
    // Check if tempEmail is not null
    if (!tempEmail) return res.status(400).json({ message: 'No email found. Please sign up first.' });

    const user = await User.findOne({ email: tempEmail });

    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.otp === otp && Date.now() < user.otpExpires) {
      // Clear OTP fields
      user.otp = undefined;
      user.otpExpires = undefined;

      // Save user to the database
      await user.save();

      // Clear temporary email
      tempEmail = null;

      res.json({ message: 'OTP verified successfully. You can now log in.' });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error verifying OTP' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));