var express = require("express")
var bodyparser = require("body-parser")

app.use(express.static('views'))
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyparser.urlencoded({ extended: true }))

var md5 = require("md5");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

app.use(cookieParser());

const con = require('./src/config/connect')
const login = require('./src/routes/authentication')
const OtherTask = require('./src/routes/OtherTask')

var app = express()
app.use("/",login)
app.use("/",OtherTask);

app.listen(6009) 
console.log(6009)