"use strict";

const express = require("express");
const request = require("request");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;
let publicPath = path.resolve(__dirname, "public");

let key = JSON.parse(fs.readFileSync('config.json'));
const API_KEY = key["api-key"];
const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";



app.get('/', (req, res) => res.sendFile(publicPath + "/client.html"));

app.listen(port, () => console.log(`To view webpage visit localhost:${port}`));

let getWeather = (location) =>{
    let reqStr = `${weatherUrl}?q=${location}&APPID=${API_KEY}`;
    //console.log(reqStr);

    request(reqStr, {json:true}, (err, res, body) => {
        if(err){
            return console.log(err);
        }
        console.log(JSON.stringify(res.body, null, 2));
    });
}

getWeather("Dublin,Ireland");
