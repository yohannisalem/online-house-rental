const {model,Schema} = require('mongoose')
const ReportedIssueSchema = Schema({
    description:{
        type:String,
        requred:true
    },
    reportedBy:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports = model('reportedIssue',ReportedIssueSchema)