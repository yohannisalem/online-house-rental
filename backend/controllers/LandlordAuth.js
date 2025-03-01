const crypto = require('crypto')
const Landlord = require("../models/Landlord");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require('../utils/sendEmail')
const MultipleFile = require('../models/Houses');
const Contract = require('../models/Contract');
exports.landlordRegister = async(req,res,next)=>{
  const { firstname,lastname,username, email,phone , password } = req.body;
if(!username || !email || !password || !firstname || !lastname){
  res.status(400).send("please provide data to the fields")
}
  try {
    const user = await Landlord.create({
      firstname,
      lastname,
      username,
      phone,
      email,
      password,
    });
    sendToken(user, 201, res);
    
  } catch (err) {
   next(err)
  }
}
exports.landlordLogin = async (req,res,next)=>{
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("please provide email and password")
  }

    try {
        
        const user = await Landlord.findOne({ email }).select("+password");
        if (!user) {
          res.status(404).send("user is not found")
           
        }
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
          res.status(400).send("password didn't match")

        }
        sendToken(user, 200, res);

    } catch (error) {
        next(error)
    }
}

exports.landlordForgotPassword= async (req,res,next)=>{
    const { email } = req.body;

  try {
    const user = await Landlord.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
}
exports.landlordResetPassword = async (req,res,next)=>{
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await Landlord.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token tttt", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
}
exports.getMyHouses = async (req,res,next)=>{
  const loggedLandlord = req.params.email
  try {

    const files = await MultipleFile.find({'owneremail':loggedLandlord});
    res.header('Content-Range', '0-20/20')
    res.status(200).send(files);
} catch (error) {
    res.status(400).send(error.message);
}
}
exports.contractList = async (req,res,next)=>{
  const loggedLandlord = req.params.email
  try {

    const files = await Contract.find({'landlordemail':loggedLandlord});
    res.header('Content-Range', '0-20/20')
    res.status(200).send(files);
} catch (error) {
    res.status(400).send(error.message);
}
}
exports.getProfileInfo = async (req,res,next)=>{
  const landlordid = req.params.id
  try {
    const user = await Landlord.findById(landlordid)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
exports.updateProfile = async (req,res,next)=>{
  const landlordid = req.params.id
  try {
    const profileinfo = await Landlord.findOneAndUpdate({'_id':landlordid},{
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      username:req.body.username,
      phone :req.body.phone,
      email: req.body.email
    })
    res.send(profileinfo)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token,id:user._id,username:user.username,phone:user.phone,email:user.email});
  };