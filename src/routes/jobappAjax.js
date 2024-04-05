var express = require("express")
const con = require('../config/connect')

const login = express.Router();
// Job Crud without ajax
const { getJobForm, postJobForm, getEmpData, updateFormPost } = require('../controller/JobApp')
// Job crud with ajax
const { getAjaxForm, postJobFormAjax, getEmpAjax, updateFormAjaxPost } = require('../controller/JobAppAjax')
const validUser = require('../middleware/token')

login.route("/formValid").get(validUser,getJobForm);
login.route("/submitData").post(validUser,postJobForm);
login.route("/submitData/:emp_id").get(validUser,getEmpData);
login.route("/submitData/:emp_id/update").post(validUser,updateFormPost);

login.route("/formAjax").get(validUser,getAjaxForm);
login.route("/submitDataAjax").post(validUser,postJobFormAjax);
login.route("/submitDataAjax/:emp_id").get(validUser,getEmpAjax);
login.route("/submitDataAjax/:emp_id/update").post(validUser,updateFormAjaxPost);

module.exports = login;