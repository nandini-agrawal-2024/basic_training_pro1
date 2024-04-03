// Attendance Grid + Result Grid + Dynamic Sql Query Genrator

var express = require("express")
const con = require('../config/connect')

const login = express.Router();
const
    {
        getAtt, getMysqlTableGen,
        getResultGrid, getReportResult, getAttResult,
        getStudentSort,
        getSearchDel, getSearchID,
        getSortCols,
        getPosts, getIdPost
    } = require('../controller/nodeEx')


login.route("/att").get(getAtt);
login.route("/sqlTableGen").get(getMysqlTableGen);

login.route("/resultGrid").get(getResultGrid);
login.route("/view").get(getReportResult);
login.route("/attResult").get(getAttResult);

login.route("/studentSort").get(getStudentSort);

login.route("/searchDel").get(getSearchDel).post(getSearchDel)
login.route("/searchID").get(getSearchID).post(getSearchDel);

login.route("/SortCols").get(getSortCols)

login.route("/getPost").get(getPosts)
login.route("/:id").get(getIdPost)


module.exports = login;