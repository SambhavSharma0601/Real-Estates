import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';
import nodemailer from 'nodemailer';
import FormData from '../models/form.model.js';

export const test = (req, res) => {
  res.json({
    message: 'Working ',
  });
};

 export const submitForm = async (req, res, next) => {
  const { problemDescription, email } = req.body;
  console.log(email);

  try {
    const newFormSubmission = new FormData({ problemDescription, email });
    await newFormSubmission.save();

    transporter.sendMail(
      {
        from: 'spotifyuse143@gmail.com',
        to:email,
        subject: `New message from ${email}`,
        text: `
        Message:
        ${problemDescription}`,
      },
      function (error, info) {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );

    console.log("Form submitted successfully!");
    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can not delete this account '));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('deleted');
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'Not available'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
