var express = require("express")
var bodyparser = require("body-parser")
var app = express();

const path = require('path')

var md5 = require("md5");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(express.static('views'))
app.use(express.static("public"))
app.use(bodyparser.urlencoded({ extended: true }))

const con = require('./src/config/connect')
const login = require('./src/routes/authentication')
const OtherTask = require('./src/routes/OtherTask')
const nodeTask = require('./src/routes/nodeTask')

app.set('view engine', 'ejs');
app.use("/",login)
app.use("/",OtherTask);
app.use("/",nodeTask);

app.listen(6009) 
console.log(6009)