const express = require('express')
const router = express.Router()
const {registerContract, sendAppointment, login, register, getHouseRequests, getTenants, getLandlords, deleteTenant, deleteLandlord} = require('../controllers/Admin')
router.post('/savecontract',registerContract)
router.post('/sendappointment',sendAppointment)
router.post('/register',register)
router.get('/login',login)
router.get('/gethouserequest',getHouseRequests)
router.get('/gettenants',getTenants)
router.get('/getlandlords',getLandlords)
router.delete('/deletetenant/:tenantId',deleteTenant)
router.delete('/deletelandlord/:landlordId',deleteLandlord)

module.exports = router