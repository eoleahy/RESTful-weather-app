"use strict";

const express = require("express");
const request = require("request");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;
let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

let key = JSON.parse(fs.readFileSync('config.json'));
const API_KEY = key["api-key"];
const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";



app.get('/', (req, res) => res.sendFile(publicPath + "/client.html"));
app.get('/weather/:location',  getWeather);

app.listen(port, () => console.log(`To view webpage visit localhost:${port}`));

function getWeather(req, res){
    let loc = req.params['location'];
    //console.log(loc);
    if(loc === ""){
        res.status(400);
        res.send("Error 400: Bad request");
        return;
    }

    let reqStr = `${weatherUrl}?q=${loc}&APPID=${API_KEY}`; 
    request(reqStr, {json:true}, (err, apiResponse, body) => {
        if(err){ return console.log(err); }

        //console.log(JSON.stringify(response.body, null, 2));
        res.send(apiResponse.body);
    });
}

//getWeather("Dublin,Ireland");
