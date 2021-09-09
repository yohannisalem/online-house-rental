
const User = require("../models/RequestedHouses");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require('../utils/sendEmail')
exports.contractSigning = async (req,res,next)=>{
    const { tenantEmail } = req.body;
  try {
    const user = await User.findOne({ tenantEmail });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Create reset url to email to provided email
    const contractForm = `http://localhost:3000/contract/`;

    // HTML Message
    const message = `
      <h1>You have requested a house for rent</h1>
      <p>Please make a put request to the following link:</p>
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