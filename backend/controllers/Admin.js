const webpush = require('web-push');
const Appointment = require('../models/Appointment');
const Contract = require("../models/Contract")
const HouseRequest = require("../models/RequestedHouses");
const Landlord = require("../models/Landlord")
const Tenant = require("../models/User")
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require('../utils/sendEmail')

const Admin = require('../models/Admin')
const publicVapidKey = 'BMffGk0gRxLPOSi-eOlXoR1ahY9Ce7uBY3010C06TeMoRYS_6n1A4ItVeOeNYutDlhPK27WW5UMrdyjBEj_-Pxo';
const privateVapidKey = 'QCipepmgJm_noa9A4-0Q-Wjbwm1GL02DSDpX6-ynFwU';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey,privateVapidKey);
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token,username:user.username,email:user.email});
};
exports.register = async(req,res,next)=>{
  const { username, email, password } = req.body;

  try {
    const user = await Admin.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
    
  } catch (err) {
   next(err)
  }
}
exports.login = async (req,res,next)=>{
  const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
        const user = await Admin.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 404));
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 404));
        }
        sendToken(user, 200, res);
    } catch (error) {
        next(error)
    }
}

exports.contractSigning = async (req, res, next) => {
  const { tenantEmail } = req.body;
  try {
    const user = await HouseRequest.findOne({ tenantEmail });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Create reset url to email to provided email
    const contractForm = `http://localhost:3000/contract/`;

    // HTML Message
   
    const message = `
      <h1>You have requested a house for rent</h1>
      <p>Please make a post request to the following link:</p>
      <a href=${contractForm} clicktracking=off>${contractForm}</a>
    `;
    try {
      await sendEmail({
        to: user.tenantEmail,
        subject: "contract signing form",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err)
      await user.save();
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
}
exports.registerContract = async (req, res) => {
  try {
    const contract = new Contract({
      tenantname: req.body.tenantname,
      landlordname: req.body.landlordname,
      landlordemail: req.body.landlordemail,
      houseid: req.body.houseid,
      feepermonth: req.body.feepermonth,
      contractduration: req.body.contractduration,
      termsandcondition: req.body.termsandcondition
    })
    await contract.save()
    res.status(200).send("contract signed successfully")
  } catch (error) {
    res.status(400).send(error.message);
  }
}
exports.sendAppointment= async (req,res)=>{

  const { tenantEmail,appointmentletter,date} = req.body;
  try {
    const user = await HouseRequest.findOne({ tenantEmail });
    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }
    // Create reset url to email to provided email
    const contractForm = `http://localhost:3000/appointmentdetail/`;
    const message = `
      <h1>${appointmentletter},${date}</h1>
      <p>Please make a post request to the following link:</p>
      <a href=${contractForm} clicktracking=off>${contractForm}</a>
    `;
    try {
      await sendEmail({
        to: [user.tenantEmail,user.landlordemail],
        subject: "notifying the appointment date",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err)

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    } 
 
  } catch (error) {
    res.status(500).send("appointment is not sent to user")
  }
  
}
exports.getHouseRequests = async (req,res)=>{
  try {
    const requests = await HouseRequest.find({})
    res.status(200).send(requests)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
exports.getTenants = async (req,res)=>{
  try {
    const tenants = await Tenant.find({})
    res.status(200).send(tenants)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
exports.getLandlords = async (req,res)=>{
  try {
    const landlords = await Landlord.find({})
    res.status(200).send(landlords)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
exports.deleteTenant = async (req,res)=>{
  try {
    const tenantId = req.params.id
        const deletedUser = await Tenant.findByIdAndDelete(tenantId)
        res.send(deletedUser)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
exports.deleteLandlord = async (req,res)=>{
  try {
    const landlordId = req.params.id
        const deletedLandlord = await Landlord.findByIdAndDelete(landlordId)
        res.send(deletedLandlord)
  } catch (error) {
    res.status(400).send(error.message)
  }
}


