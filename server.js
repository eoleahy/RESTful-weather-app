"use strict";

const express = require("express");
const request = require("request");
const app = express();
const port = 3000;

const path = require("path");

let publicPath = path.resolve(__dirname,"public");
//app.use("/static",express.static(publicPath))


app.get('/', (req, res) => res.sendFile(publicPath+"/client.html"));

app.listen(port, () => console.log('Example app listening on port ${port}!'));

//Put a promise in here
request("https://api.openweathermap.org/data/2.5/forecast?q=Dublin,Ireland&APPID=3e2d927d4f28b456c6bc662f34350957", {json:true}, (err,res,body) =>{
    if(err){ return console.log(err);}
    console.log(res.body);
});