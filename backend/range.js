module.exports = (req,res,next)=>{
    res.header('Content-Range','getMultipleFiles 0-20/20')
    next()
}