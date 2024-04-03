var express = require("express")
const con = require('../config/connect')

const login = express.Router();
// without ajax
const{getJobForm, postJobForm, getEmpData, updateFormPost} = require('../controller/JobApp')
// with ajax
const{getAjaxForm, postJobFormAjax, getEmpAjax, updateFormAjaxPost} = require('../controller/JobAppAjax')

login.route("/formValid").get(getJobForm);
login.route("/submitData").post(postJobForm);
login.route("/submitData/:emp_id").get(getEmpData);
login.route("/submitData/:emp_id/update").post(updateFormPost);

login.route("/formAjax").get(getAjaxForm);
login.route("/submitDataAjax").post(postJobFormAjax);
login.route("/submitDataAjax/:emp_id").get(getEmpAjax);
login.route("/submitDataAjax/:emp_id/update").post(updateFormAjaxPost);

module.exports = login;