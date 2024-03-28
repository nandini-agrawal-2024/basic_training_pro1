// Attendance Grid + Result Grid + Dynamic Sql Query Genrator

var express = require("express")
const con = require('../config/connect')

const login = express.Router();
const 
{
    getAtt,getMysqlTableGen,
    getResultGrid,getReportResult,getAttResult,
    getStudentSort,
    getSearchDel,getSearchID
} = require('../controller/auth')


login.route("/att").get(getAtt);
login.route("/sqlTableGen").get(getMysqlTableGen);

login.route("/resultGrid").get(getResultGrid);
login.route("/view").get(getReportResult);
login.route("/attResult").get(getAttResult);


login.route("/studentSort").get(getStudentSort);

login.route("/searchDel").get(getSearchDel).post(getSearchDel)
login.route("/searchID").get(getSearchID).post(getSearchDel);



module.exports = login;