const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const AdminSchema = Schema({
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
    }
})

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
AdminSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
AdminSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
module.exports = model('admin', AdminSchema)