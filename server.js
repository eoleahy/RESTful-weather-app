"use strict";

const express = require("express");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const port = 3000;
let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

let key = JSON.parse(fs.readFileSync('config.json'));
const API_KEY = key["api-key"];
const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";



app.get('/', (req, res) => res.sendFile(publicPath + "/client.html"));
//app.get('/:location',  getWeather);
app.get('/:location', (req, res, next) =>{
    console.log(":)")
    res.sendFile(publicPath + "/client.html", {"location":"ireland"});
});

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
    
    let p = fetch(reqStr)
    p.then(res => res.json())
    .then(data => { res.send({data});})
    .catch(err => {
        res.send("Error 400: Bad request");
    });
}

//getWeather("Dublin,Ireland");
