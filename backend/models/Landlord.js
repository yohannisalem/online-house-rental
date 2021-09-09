const crypto = require("crypto");
const {model,Schema} = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const LandlordSchema = Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: false,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: false
       /*  match: [
            /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
            "Please provide a valid phone number",
        ], */

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
LandlordSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
LandlordSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
LandlordSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
LandlordSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Min

    return resetToken;
};
module.exports = model("landlord", LandlordSchema)