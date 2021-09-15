const {model,Schema} = require('mongoose')
const ContractSchema = Schema({
    tenantname:{type:String},
    landlordname:{type:String},
    landlordemail:{type:String},
    houseid:{type:String},
    feepermonth:{type:Number},
    contractduration:{type:Date},
    termsandcondition:{type:String}
},{timestamps:true})

module.exports = model("contract",ContractSchema)