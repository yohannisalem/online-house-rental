const express = require('express')
const router = express.Router()
const {register, login, resetPassword, forgotPassword} = require('../controllers/auth')
const {landlordRegister, landlordLogin, landlordForgotPassword, landlordResetPassword, updateProfile, getProfileInfo} = require('../controllers/LandlordAuth')
router.post('/register',register)
router.post('/login',login)
router.post('/landlordLogin',landlordLogin)
router.post('/landlordRegister',landlordRegister)
router.put('/updateaccount/:id',updateProfile)
router.post('/forgotpassword',forgotPassword)
router.get('/getlandlord',getProfileInfo)
router.post('/landlordForgotPassword',landlordForgotPassword)
router.put('/passwordreset/:resetToken',resetPassword)
router.put('/landlordPasswordReset/:resetToken',landlordResetPassword)


module.exports = router