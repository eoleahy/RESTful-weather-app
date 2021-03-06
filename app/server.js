"use strict";
const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

require('dotenv').config();

const API_KEY = process.env.WEATHER_API;
const app = express();

const port = process.env.PORT || 3000;
let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));


const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";

app.get('/:location', sendWeather);
app.get('/', (req, res) => res.sendFile(publicPath + "/client.html"));
//app.get('/:location',  getWeather);


app.listen(port, () => console.log(`To view webpage visit localhost:${port}`));

function sendWeather(req, res) {
    let loc = req.params['location'];
    //console.log(loc);
    let reqStr = `${weatherUrl}?q=${loc}&APPID=${API_KEY}&units=metric`;

    let p = fetch(reqStr)
    p.then(res => res.json())
        .then(data => {
            res.send({
                data
            });
        })
        .catch(err => {
            res.send("Error 400: Bad request");
        });
}