"use strict";

const express = require('express')
const app = express()
const port = 3000

const path = require("path")

let publicPath = path.resolve(__dirname,"public")
//app.use("/static",express.static(publicPath))


app.get('/', (req, res) => res.sendFile(publicPath+"/client.html"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))