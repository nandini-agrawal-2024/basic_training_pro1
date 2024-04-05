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
const validUser = require('../middleware/token')

login.route("/att").get(validUser,getAtt);
login.route("/sqlTableGen").get(validUser,getMysqlTableGen);

login.route("/resultGrid").get(validUser,getResultGrid);
login.route("/view").get(validUser,getReportResult);
login.route("/attResult").get(validUser,getAttResult);

login.route("/studentSort").get(validUser,getStudentSort);

login.route("/searchDel").get(validUser,getSearchDel).post(validUser,getSearchDel)
login.route("/searchID").get(validUser,getSearchID).post(validUser,getSearchDel);

login.route("/SortCols").get(validUser,getSortCols)

login.route("/getPost").get(validUser,getPosts)
login.route("/:id").get(validUser,getIdPost)


module.exports = login;