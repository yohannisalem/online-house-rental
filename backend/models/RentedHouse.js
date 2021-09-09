const {model,Schema} = require('mongoose')

const RentedHouseSchema= Schema({
    tenant:{
        type:String
    },
    house:{
        type:String
    },
    terms:{
        type:String
    },
    period:{
        type:Date
    }
})

module.exports = model("rentedHouse",RentedHouseSchema)