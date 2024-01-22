import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';



const generateRandomCode = () => {
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  return randomCode;
};

const sendEmail = (to, subject, message) => {


  const mailOptions = {
    from: 'sharmasambhav06@gmail.com',
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const verificationCode = generateRandomCode();
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 1);

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { verificationCode, verificationCodeExpires: expirationTime },
      { new: true }
    );

    if (user) {
      sendEmail(email, 'Password Recovery Code', `Your verification code is: ${verificationCode}`);
      res.json({ success: true, message: 'Verification code sent successfully' });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error generating verification code' });
  }
};

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: new Date() },
    });

    if (user) {
      // Clear the verification code and expiration after successful verification
      user.verificationCode = null;
      user.verificationCodeExpires = null;
      await user.save();

      res.json({ success: true, message: 'Code verified successfully' });
    } else {
      res.json({ success: false, error: 'Incorrect code or code expired' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error verifying code' });
  }
};

export const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: newPassword, verificationCode: null, verificationCodeExpires: null },
      { new: true }
    );

    if (updatedUser) {
      res.json({ success: true, message: 'Password updated successfully' });
    } else {
      res.json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error updating password' });
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    const mailOptions = {
      from: 'spotifyuse143@gmail.com',
      to: email,
      subject: 'Welcome to Sambhav Estates',
      text: 'Thank you for signing up dude',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  // console.log(req);
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(' ').join('').toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = newUser._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const mailOptions = {
        from: 'spotifyuse143@gmail.com',
        to: newUser.email,
        subject: 'Welcome to Your App',
        text: 'Thank you for signing up with Google!',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
