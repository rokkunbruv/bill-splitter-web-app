
import bcrypt from 'bcrypt';
import User from '../models/userModels.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import UserOTPVerification from '../models/UserOTPVerification.js';
//import nodemailer from 'nodemailer';

//nodemailer stuff
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth:{
    user:process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

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

    const sendOTPVerificationEmail = async ({ _id, email }) => {
      try{
        const otp  = `${Math.floor(100000 + Math.random() * 900000)}`;
    
        //mail options
        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: "Verify your email",
          html: `<p>Enter <b>${otp}</b> in the app to verify your email address</p><p>This code will <b>expire in hour</b></p>`,
    
        };
    
        const saltRounds = 10;
        


        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        const newOTP = new UserOTPVerification({
          userId: _id,
          otp: hashedOTP,
          createdAt: Date.now(),
          expiresAt: Date.now() + 3600000,
        });
        //save otp record
        await newOTP.save();
        await transporter.sendMail(mailOptions);
      }catch(error){
        console.error(error);
      }
    };
    sendOTPVerificationEmail({ newUser });

    const token = jwt.sign({ userId: User._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Signup successful', user: newUser, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// verify otp email
const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    }else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        // no record found
        throw new Error(
          "Account record doesn't exist or has been verified already. Please sign up or log in"
        );
      } else {
        //user otp record exists
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;

        if(expiresAt < Date.now()) {
          //user otp record has expired
          await UserOTPVerification.deleteMany({ userId });
          throw new Error("Code has expired. Please request again.");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            //supplied otp is wrong
            throw new Error("Invalid code passed. Check your inbox.");
          } else {
            //success code
            await User.updateOne({ _id: userId }, {verified: true});
            await UserOTPVerification.deleteMany({ userId });
            res.json({
              status: "VERIFIED",
              message: `User email verified successfully.`,
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

//resending otp
const resendOTP = async (req, res) => {
  try {
    let { userId, email } = req.body;

    if(!userId || !email) {
      throw Error("Empty user details are not allowed");
    } else {
      //delete existing records and resend
      await UserOTPVerification.deleteMany({ userId });
      sendOTPVerificationEmail({_id: userId, email}, res);
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

export { login, signup, verifyOTP, resendOTP };