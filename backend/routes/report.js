const express = require('express')
const { reportIssue, writeFeedBack } = require('../controllers/Tenant')
const router = express.Router()
router.post('/reportissue',reportIssue)
router.post('/feedback',writeFeedBack)

module.exports = router