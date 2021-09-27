const {model,Schema} = require('mongoose')
const ContractSchema = Schema({
    tenantname:{type:String,required:true},
    tenantemail:{type:String,required:true},
    landlordname:{type:String,required:true},
    landlordemail:{type:String,required:true},
    houseid:{type:String,required:true},
    feepermonth:{type:Number,required:true},
    contractduration:{type:String,required:true},
    termsandcondition:{type:String,required:true},
    tenantsignature:{type:String},
    landlordsignature:{type:String}
},{timestamps:true})

module.exports = model("contract",ContractSchema)