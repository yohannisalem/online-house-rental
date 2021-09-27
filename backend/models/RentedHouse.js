const {model,Schema} = require('mongoose')

const RentedHouseSchema= Schema({
    tenantname:{
        type:String
    },
    houseid:{
        type:String
    },
    terms:{
        type:String
    },
    period:{
        type:String
    }
})

module.exports = model("rentedHouse",RentedHouseSchema)