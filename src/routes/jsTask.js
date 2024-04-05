// js task 

var express = require("express")
const con = require('../config/connect')

const login = express.Router();
const {
    cityStateget, getSates, getCities,
    timeZoneget,
    kukucubeget, dynamic_tableget, tictacget, sortAlgget, jsEventsget, jobAppget,
} = require('../controller/jsTask')
const validUser = require('../middleware/token')


login.route("/kukucube").get(validUser,kukucubeget);
login.route("/dynamic_table").get(validUser,dynamic_tableget);
login.route("/tictac").get(validUser,tictacget);
login.route("/sortAlg").get(validUser,sortAlgget);
login.route("/jsEvents").get(validUser,jsEventsget);

login.route("/jobApp").get(validUser,jobAppget);

login.route("/timezone").get(validUser,timeZoneget);

login.route("/cityState").get(validUser,cityStateget);
login.route('/state').get(validUser,getSates);
login.route('/city/:state').get(validUser,getCities);


module.exports = login;