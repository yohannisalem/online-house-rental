const Request = require('../models/RequestedHouses')
exports.RequestHousesForRent = async (req,res)=>{
    try {
        const requestedHouse = Request({
            tenantId:req.body.tenantId,
            houseId:req.body.houseId,
            tenantPhone:req.body.tenantPhone,
            tenantEmail:req.body.tenantEmail,
            landlordusername:req.body.landlordusername,
            landlordemail:req.body.landlordemail

        })
        await requestedHouse.save()
        res.status(201).send('Successfully requested this house for rent and we will proceed to an appointment soon');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
exports.getRequestedHouse = async (req,res)=>{
    const userId = req.params.id
    try {
        const house = await Request.find({ 'tenantId': userId })
        res.send(house)

    } catch (error) {
        res.status(400).send(error.message)
    }
}
