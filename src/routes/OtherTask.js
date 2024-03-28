// js task 

var express = require("express")
const con = require('../config/connect')

const login = express.Router();
const 
{
    cityStateget,getSates,getCities,
    timeZoneget,
    kukucubeget,dynamic_tableget,tictacget,sortAlgget,jsEventsget,jobAppget,
} = require('../controller/auth')


login.route("/kukucube").get(kukucubeget);
login.route("/dynamic_table").get(dynamic_tableget);
login.route("/tictac").get(tictacget);
login.route("/sortAlg").get(sortAlgget);
login.route("/jsEvents").get(jsEventsget);

login.route("/jobApp").get(jobAppget);

login.route("/timezone").get(timeZoneget);

login.route("/cityState").get(cityStateget);
login.route('/state').get(getSates);
login.route('/city/:state').get(getCities);


module.exports = login;