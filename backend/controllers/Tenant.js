
const Report = require('../models/ReportedIssue')

const reportIssue = async (req,res)=>{
   try {
       const issueReported = Report({
           description:req.body.description,
           reportedBy:req.body.reportedBy
       })
       await issueReported.save({})
   } catch (error) {
       res.status(400).send(error.message)
   }
}
module.exports={
    reportIssue
}