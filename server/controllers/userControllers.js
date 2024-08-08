
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import User from '../models/userModels.js';
import UserOTPVerification from '../models/UserOTPVerification.js';

let forgotPasswordEmail = '';

// what do i want to do:
// 1. signup should remain as is
// 3. find a way such that the otp schema will get expired
// 4. make a controller that checks if the inputted otp is same as the sent otp
//    - if it matches, it should return the jwt token of that user so that they can actually access the app

// requests: email and password
// responds: user object and token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', user: user, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// requests: name, email, password, confirmPassword
// responds: user object and token
const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const isPasswordStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      returnScore: false,
    });

    if (!isPasswordStrong) {
      return res.status(400).json({ message: 'Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// requests: user object
// responds: message
const sendOTPVerificationEmail = async (req, res) => {
  try{
    const { email } = req.body;

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth:{
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    if (!email) {
      res.status(400).json({ message: "Email not found"});
    }

    const user = await User.findOne({ email });

    if (!user._id) {
      res.status(400).json({ message: "User not found"});
    }
    
    // generate 6-digit otp
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

    // verify signup email format
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Verify Signup Code',
      html: `<h2>Hello ${user.name}</h2> 
            <p>We need to verify your account to continue with the signup. Please use the following 6-digit code:</p>
            <h3>${otp}</h3>`,
    };

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    const newOTP = new UserOTPVerification({
      userId: user._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOTP.save();
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email verification sent' });
  }catch(error){
    res.status(500).json({ message: error.message });
  }
};

// requests: userId and otp
// responds: jwt token
const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: "Empty OTP details are not allowed"});
    }
    
    const UserOTPVerificationRecords = await UserOTPVerification.find({ userId });

    if (UserOTPVerificationRecords.length <= 0) {
      return res.status(400).json({ mesage: "Account record doesn't exist or has been verified already. Please sign up or log in" });
    } 

    const pos = UserOTPVerificationRecords.length
    
    if (UserOTPVerificationRecords[pos-1].expiresAt < Date.now()) {
      await UserOTPVerification.deleteMany({ userId });
      return res.status(400).json({ message: "Code has expired. Please request again." });
    }

    const validOTP = await bcrypt.compare(otp, UserOTPVerificationRecords[pos-1].otp);

    if (!validOTP) {
      return res.status(400).json({ message: "Invalid code passed. Check your inbox." });
    }

    await User.updateOne({ _id: userId }, {verified: true});
    await UserOTPVerification.deleteMany({ userId });

    // if account has been verified successfully, it will generate a token
    // which will allow the user to access the app
    const token = jwt.sign({ userId: User._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: `User email verified successfully.`, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// requests: email
// responds: message
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // generate otp
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    forgotPasswordEmail = email;

    user.resetCode = resetCode;
    user.resetCodeExpiresAt = Date.now() + 300000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset Code',
      html: `<h2>Hello ${user.name}</h2> 
            <p>You have requested a password reset. Please use the following 6-digit code:</p>
            <h3>${resetCode}</h3>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send password reset code' });
      }
      console.log('Password reset code sent:', info.response);
      res.status(200).json({ message: 'Password reset code has been sent to your email' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const verifyResetPassword = async (req, res) => {
  try {
    const { resetCode } = req.body;

    if (!resetCode) {
      return res.status(400).json({ message: 'Invalid reset code'});
    }

    const email = forgotPasswordEmail;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.resetCodeExpiresAt < Date.now()) {
      user.resetCode = '';
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    if (resetCode !== user.resetCode) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    user.resetCode = ''; // Clear the reset code

    res.status(200).json({ message: 'Password reset has been verified.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// requests: resetCode, password, confirmPassword
// responds: message
const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    const email = forgotPasswordEmail;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if(!password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const isPasswordStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      returnScore: false,
    });

    if (!isPasswordStrong) {
      return res.status(400).json({ message: 'Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export { login, signup, verifyOTP, sendOTPVerificationEmail, verifyResetPassword, resetPassword, forgotPassword };