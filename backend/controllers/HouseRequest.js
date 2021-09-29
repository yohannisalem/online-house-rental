const Request = require('../models/RequestedHouses')
exports.RequestHousesForRent = async (req,res)=>{
    try {
        const requestedHouse = Request({
            tenantId:req.body.tenantId,
            houseId:req.body.houseId,
            tenantPhone:req.body.tenantPhone,
            tenantEmail:req.body.tenantEmail,
            landlordusername:req.body.landlordusername,
            landlordemail:req.body.landlordemail,
            termsandcondition:req.body.termsandcondition

        })
        await requestedHouse.save()
        res.status(201).send('Successfully requested this house for rent and we will proceed to an appointment soon');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
exports.getRequestedHouse = async (req,res)=>{
    const tenantemail = req.params.email
    try {
        const house = await Request.find({ 'tenantEmail': tenantemail })
        res.send(house)

    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.cancelHouseRequest = async (req,res)=>{
    const loggedTenant = req.params.email
    try {
      const files = await Request.findOneAndRemove({'tenantEmail':loggedTenant});
      res.status(200).send(files);
  } catch (error) {
      res.status(400).send(error.message);
  }
}
