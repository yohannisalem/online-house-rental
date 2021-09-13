const express = require('express')
const { reportIssue, writeFeedBack, getFeedBack, getReport } = require('../controllers/Tenant')
const router = express.Router()
router.post('/reportissue',reportIssue)
router.post('/feedback',writeFeedBack)
router.get('/getfeedback',getFeedBack)
router.get('/getreport',getReport)

module.exports = router