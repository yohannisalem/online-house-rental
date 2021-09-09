const mongoose = require("mongoose");
MONGO_URL = 'mongodb+srv://yohannis:mrx5FTAZA8qJoGkm@hrcluster.uqvxv.mongodb.net/onlinehouserental?retryWrites=true&w=majority'
const connectDB = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;
