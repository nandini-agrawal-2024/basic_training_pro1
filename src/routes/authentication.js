// register and login 

var express = require("express")
const con = require('../config/connect')

const login = express.Router();
const {
    getStart, getIndex, postSignUp, getSignUp, postPass, getPass, postLoginAuth, getLoginAuth, forgotPost, forgotGet,

    newTokencreate,
} = require('../controller/auth')
const validUser = require('../middleware/token')

login.route("/newTokencreate").get(newTokencreate);

login.route("/").get(getIndex);
login.route("/welcome").get(validUser,getStart);
login.route("/signup").get(getSignUp);
login.route("/insert").post(postSignUp);
login.route("/loginAuth").get(getLoginAuth).post(postLoginAuth);
login.route("/password").get(getPass).post(postPass);
login.route("/forgot").get(forgotGet).post(forgotPost);


module.exports = login;