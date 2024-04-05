var express = require("express")
var bodyparser = require("body-parser")
var app = express();

// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(express.static('views'))
app.use(express.static("public"))
app.use(bodyparser.urlencoded({ extended: true }))

const con = require('./src/config/connect')
const login = require('./src/routes/authentication')
const OtherTask = require('./src/routes/jsTask')
const nodeTask = require('./src/routes/nodeTask')
const jobappAjax = require('./src/routes/jobappAjax')

app.set('view engine', 'ejs');
app.use("/",login)
app.use("/",jobappAjax);
app.use("/",OtherTask);
app.use("/",nodeTask);

app.listen(6009) 
console.log(6009)