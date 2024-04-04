var express = require("express")
var bodyparser = require("body-parser")
var con = require('../config/connect')
var md5 = require("md5");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser());
app.use(express.static("public"))
app.use(express.static('views'))
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

function genSalt(length) {
  const setExa = 'abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var resultSet = '';
  for (var i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * setExa.length);
    resultSet += setExa[randomNum];
  }
  return resultSet;
}

const getStart = async (req, res) => {
  if (req.cookies.token)
    res.render('welcome');
  else
    res.render('regform');
}

const getIndex = async (req, res) => {
  res.render('index')
}

const getSignUp = async (req, res) => {
  res.render('regform')
}

const postSignUp = async (req, res) => {
  try {
    var { first_name, last_name, email, phone_number } = req.body;
    sqlEmail = `select * from registration where email =?`;
    data = await con.promise().query(sqlEmail, [email]);

    if (data[0].length === 0) {
      var insertReg = `insert into registration(first_name,last_name,email,phone_number,salt,activation_key) values(?,?,?,?,?,?)`
      var store = await con.promise().query(insertReg, [first_name, last_name, email, phone_number, genSalt(4), genSalt(12)])

      var reg_id = 0;
      reg_id = store[0].insertId;

      const selectQ = `select * from registration  where reg_id = ${reg_id}`;
      data = await con.promise().query(selectQ);
      result = data[0][0];

      res.render("activate", { result })
    }
    else {
      res.send("email already in use");
    }
  }
  catch (err) { res.send(err); }
};

const newTokencreate = async (req, res) => {
  try {
    const { activation_key } = req.query;
    const issue = await con.promise().query('select * from registration where activation_key = ? ', [activation_key])
    result = issue[0][0];

    if (issue[0].length === 0)
      return res.send("token invalid");
    let updateeActive = genSalt(12);
    const updateData = await con.promise().query('update registration set activation_key = ?,created_at = now() where activation_key=?', [updateeActive, activation_key])
    res.send(`<div style="background-color: aliceblue;
    padding: 30px;border: 1px solid black;border-radius: 10px;width: 30%;margin: auto;margin-top: auto;margin-top: 70;text-align: center";>
    <a href="http://localhost:6009/password/?reg_id=${result.reg_id}&activation_key=${updateeActive}" 
    style="font-size:20px;margin:50px;color:black">Click To Generate New Password</a></div>`)
  }
  catch (err) {
    res.send(err);
  }
}

const getPass = async (req, res) => {
  try {
    var activation_key = req.query.activation_key;
    var reg_id = req.query.reg_id;
    data = await con.promise().query(`select * from registration where reg_id = ${reg_id}`);
    result = data[0][0];

    var dif = new Date().valueOf() - new Date(result.created_at).valueOf();
    var remove = Math.floor(dif / 1000);

    res.render('password', { result, remove, activation_key });
  }
  catch (err) { res.send(err) }
};

const postPass = async (req, res) => {
  try {
    var { pass, reg_id, activation_key, salt, re_pass } = req.body;

    if (pass == re_pass) {
      pass = pass + salt;
      let md5Pas = md5(pass);
      updatePass = `update registration set password='${md5Pas}' where reg_id=${reg_id} and activation_key='${activation_key}'`;

      await con.promise().query(updatePass, [md5Pas, reg_id, activation_key]);
      res.json({ 'Notification': 'Pass Created' })
    }
    else {
      res.send("Password didn't Not Match")
    }
  } catch (error) {
    res.send(error);
  }
}

const getLoginAuth = async (req, res) => {
  res.render('login')
}

const postLoginAuth = async (req, res) => {
  try {
    var { email, pass } = req.body;
    var getData = `select * from registration where email = ?`;
    data = await con.promise().query(getData, [email]);
    result = data[0][0];
    if (data[0].length === 0) {
      res.json({ 'Notification': 'No Data Found' })
    }
    else {
      password = pass + result.salt;
      md5Pass = md5(password);

      if (result.password === md5Pass) {
        const token = jwt.sign({ email }, `md5Pass`, { expiresIn: '1h' });
        res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.json({ Notification: 'Login Successfull...', token: token, Notification: "Go To Main Page <a href=http://localhost:6009/welcome>Welcome</a>" })
      }
      else {
        res.json({ Notification: 'Incorrect Info' })
      }
    }
  } catch (err) { res.send(err) }
}

const forgotGet = async (req, res) => {
  res.render('forgotPass')
}

const forgotPost = async (req, res) => {
  try {
    var email = req.body.email;
    var updSalt = `update registration set salt=?,activation_key=? where email=?`;
    var data = await con.promise().query(updSalt, [genSalt(4), genSalt(12), email]);
    result = data[0][0];

    getData = `select * from registration where email=?`;
    data = await con.promise().query(getData, [email]);
    result = data[0][0];

    if (data[0].length === 0) {
      res.json({ 'Notification': 'Email Doesnt exists' })
    }
    else {
      res.render('newLink', { result })
    }
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  newTokencreate, getStart, getIndex, postSignUp, getSignUp, postPass, getPass, postLoginAuth, getLoginAuth,
  forgotPost, forgotGet
}

