
const Report = require('../models/ReportedIssue')
const FeedBack = require('../models/FeedBack')
const reportIssue = async (req,res)=>{
   try {
       const issueReported = Report({
           description:req.body.description,
           reportedBy:req.body.reportedBy
       })
       await issueReported.save({})
       res.status(201).send('Report submitted successfully');
   } catch (error) {
       res.status(400).send(error.message)
   }
}
const writeFeedBack = async (req,res)=>{
    try {
        const feedBack = FeedBack({
            feedback:req.body.feedback,
            usertype:req.body.usertype,
            username:req.body.username
        })
        await feedBack.save({})
        res.status(201).send('Feedback submitted successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports={
    reportIssue,
    writeFeedBack
}