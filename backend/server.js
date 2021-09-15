require('dotenv').config({path:"./config.env"})
const express = require("express");
const cors = require('cors')
const app = express();
const connectDB = require('./config/db')
const errorHandler = require("./middleware/error");
const houseRoute = require('./routes/houses')
connectDB()

app.use(express.json())
app.use(errorHandler)
 
app.use(cors())
app.use(function (req, res, next) {


  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

  // Pass to next layer of middleware
  next();
});


app.use("/api/auth",require('./routes/auth'))
app.use("/api/private",require('./routes/private'))
app.use("/api/",houseRoute.routes)
app.use("/report/",require('./routes/report'))
app.use("/admin/",require('./routes/contract'))
const PORT = 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
