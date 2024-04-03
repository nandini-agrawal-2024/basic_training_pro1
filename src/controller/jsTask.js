var express = require("express")
var bodyparser = require("body-parser")
var con = require('../config/connect')
var app = express()
app.use(express.static("public"))
app.use(express.static('views'))
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const kukucubeget = async (req, res) => {
    res.render('kukucube')
}

const dynamic_tableget = async (req, res) => {
    res.render('dynamic_table')
}

const tictacget = async (req, res) => {
    res.render('tictac')
}

const sortAlgget = async (req, res) => {
    res.render('sortAlg')
}

const jsEventsget = async (req, res) => {
    res.render('jsEvents')
}

const jobAppget = async (req, res) => {
    res.render('jobApp')
}

const timeZoneget = async (req, res) => {
    res.render('timeZone')
}


const cityStateget = async (req, res) => {
    res.render('cityState')
};

const getSates = async (req, res) => {
    try {
        sqlSelect = `select * from state_master`;
        data = await con.promise().query(sqlSelect);
        result = data[0];
        res.send(result);
    }
    catch (err) {
        res.send(err)
    }
}
const getCities = async (req, res) => {
    try {
        sql2 = `select * from city_master where state_id = ${req.params.state}`;
        data = await con.promise().query(sql2);
        result2 = data[0];
        res.send(result2);
    } catch (err) {
        res.send(err)
    }
}


module.exports = {
    cityStateget, getSates, getCities,
    kukucubeget, dynamic_tableget, tictacget, sortAlgget, jsEventsget, jobAppget, timeZoneget,
}
