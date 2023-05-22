const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURI = process.env.MONGO_URL;
const mongoURI =
  "mongodb+srv://yogendrarajpoot:Zxkd7hTbISMqeLfe@cluster0.mwxqu83.mongodb.net/myDatabase?retryWrites=true&w=majority";

// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log("mongo connect=========>", conn.connection.host);
  } catch (error) {
    console.log("error============>", error);
  }
};

module.exports = connectToMongo;
