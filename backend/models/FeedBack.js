const {model,Schema} = require('mongoose')
const FeedBackSchema = Schema({
    feedback:{type:String},
    usertype:{type:String},
    username:{type:String}
},{timestamps:true})
module.exports = model('feedback',FeedBackSchema)