// JOb App CRUD - No Ajax

var express = require("express")
const con = require('../config/connect')

const login = express.Router();
const 
{
    // without ajax
    getJobForm,postJobForm,getEmpData,updateFormPost,

    // with ajax 
    getAjaxForm,postJobFormAjax,getEmpAjax,updateFormAjaxPost

} = require('../controller/JobApp')


login.route("/formValid").get(getJobForm);
login.route("/submitData").post(postJobForm);
login.route("/submitData/:emp_id").get(getEmpData);
login.route("/submitData/:emp_id/update").post(updateFormPost);

login.route("/formAjax").get(getAjaxForm);
login.route("/submitDataAjax").post(postJobFormAjax);
login.route("/submitDataAjax/:emp_id").get(getEmpAjax);
login.route("/submitDataAjax/:emp_id/update").post(updateFormAjaxPost);


module.exports = login;