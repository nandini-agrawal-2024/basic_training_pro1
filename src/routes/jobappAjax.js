// JOb App CRUD Ajax

var express = require("express")
const con = require('../config/connect')

const login = express.Router();
const 
{
    getJobForm,postInsertJob
} = require('../controller/JobApp')


login.route("/form").get(getJobForm);
login.route("/submitData").post(postInsertJob);

module.exports = login;