// JOb App CRUD - No Ajax

var express = require("express")
const con = require('../config/connect')

const login = express.Router();
const 
{
    getJobForm,postJobForm,getEmpData,updateFormPost
} = require('../controller/JobApp')


login.route("/formValid").get(getJobForm);
login.route("/submitData").post(postJobForm);
login.route("/submitData/:emp_id").get(getEmpData);
login.route("/submitData/:emp_id/update").post(updateFormPost);

module.exports = login;