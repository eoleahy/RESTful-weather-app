"use strict";

const express = require("express");
const request = require("request");
const fs = require("fs");
const path = require("path");
const app = express();

const port = 3000;
let publicPath = path.resolve(__dirname,"public");
//app.use("/static",express.static(publicPath))

const API_KEY = JSON.parse(fs.readFileSync('config.json'));
console.log(API_KEY);


app.get('/', (req, res) => res.sendFile(publicPath+"/client.html"));

app.listen(port, () => console.log('Example app listening on port ${port}!'));

/*Put a promise in here
request("https://api.openweathermap.org/data/2.5/forecast?q=Dublin,Ireland&APPID=3e2d927d4f28b456c6bc662f34350957", {json:true}, (err,res,body) =>{
    if(err){ return console.log(err);}
    console.log(res.body);
});
*/