const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/schedule_notification";
mongoose.connect(MONGO_URI, {
useUnifiedTopology: true,
useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Database connected");
});

//module.exports = mongoose;