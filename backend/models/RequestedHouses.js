const {model,Schema} = require('mongoose')

const RequestSchema = Schema({
    tenantId:{type:String,required:true},
    houseId:{type:String,required:true},
    landlordusername:{type:String},
    landlordemail:{type:String},
    tenantPhone: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: false,
        match: [
            /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
            "Please provide a valid phone number",
        ],

    },
    tenantEmail: {
        type: String,
        required: [true, "Please provide email address"],
        unique: false,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
      },
},{timestamps:true})

module.exports= model("requestedHouse",RequestSchema)