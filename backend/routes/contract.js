const express = require('express')
const router = express.Router()
const {registerContract, sendAppointment, login, register} = require('../controllers/Admin')
router.post('/savecontract',registerContract)
router.post('/sendappointment',sendAppointment)
router.post('/register',register)
router.get('/login',login)

module.exports = router