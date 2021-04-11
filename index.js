const express = require("express");
const mongoose = require('mongoose')
const app = express();
const http = require('http').createServer(app)
// const app = http.createServer()
const url ='mongodb://localhost:27017/schedule_notification'
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
const con = mongoose.connection


con.on('open',()=>{
    console.log("Database Connected")
})

const schedule = require("./services/schedule");
require("./db");

app.use(express.json());

app.use("/api", require("./route"));

schedule.reSchedule();

http.listen(4000, () => {
    console.log("Server is running on PORT 4000");
});


