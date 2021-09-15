const {model,Schema} = require('mongoose')
const Appointment =Schema({
    appointmentletter:{type:String},
    date:{type:Date},
    tenantusername:{type:String},
    landlordusername:{type:String}
},{timestamps:true})
module.exports = model("appointment",Appointment)