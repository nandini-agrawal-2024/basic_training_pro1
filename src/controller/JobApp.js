var express = require("express")
var bodyparser = require("body-parser")
var con = require('../config/connect')
var app = express()
app.use(express.static("public"))
app.use(express.static('views'))
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const getJobForm = async (req, res) => {
    res.render('form')
}

const postInsertJob = async (req, res) => {
    var { first_name, last_name, designation, email, phone_number, gender, relationship, address, address2, city, state, zipcode, date_of_birth } = req.body;
    var { course, board, pass_year, percentage } = req.body;
    var { ref_name, contact_name, relation_name } = req.body;
    var { com_name, des, from, to } = req.body;
    var { location, department, notice, expCTC, curCTC } = req.body;
    var { php, techphp, mysql, techmysql, laravel, techlaravel, oracle, techoracle } = req.body;
    var { hindi, hindi_read, hindi_write, hindi_speak, gujarati, gujarati_read, gujarati_write, gujarati_speak,
        english, english_read, english_write, english_speak } = req.body;

    var sql = `select option_master.oid,option_master.sid, option_master.option_key from select_master inner join 
    option_master on select_master.sid = option_master.sid `;
    SSC = 0; HSC = 0; Bachelor = 0; Master = 0;

    let result = await con.promise().query(sql);
    result[0].forEach(e => {
        if (e.option_key == "Male" && gender == "male") gender = e.oid;
        if (e.option_key == "Female" && gender == "female") gender = e.oid;
        if (e.option_key == "Single" && relationship == "single") relationship = e.oid;
        if (e.option_key == "Married" && relationship == "married") relationship = e.oid;

        if (e.option_key == "PHP" && php == "on") php = e.oid;
        if (e.option_key == "Beginer" && techphp == "Beginer") techphp = e.oid;
        if (e.option_key == "Mideator" && techphp == "Mideator") techphp = e.oid;
        if (e.option_key == "Expert" && techphp == "Expert") techphp = e.oid;

        if (e.option_key == "Mysql" && mysql == "on") mysql = e.oid;
        if (e.option_key == "Beginer" && techmysql == "Beginer") techmysql = e.oid;
        if (e.option_key == "Mideator" && techmysql == "Mideator") techmysql = e.oid;
        if (e.option_key == "Expert" && techmysql == "Expert") techmysql = e.oid;

        if (e.option_key == "Laravel" && laravel == "on") myslaravelql = e.oid;
        if (e.option_key == "Beginer" && techlaravel == "Beginer") techlaravel = e.oid;
        if (e.option_key == "Mideator" && techlaravel == "Mideator") techlaravel = e.oid;
        if (e.option_key == "Expert" && techlaravel == "Expert") techlaravel = e.oid;

        if (e.option_key == "Oracle" && oracle == "on") oracle = e.oid;
        if (e.option_key == "Beginer" && techoracle == "Beginer") techoracle = e.oid;
        if (e.option_key == "Mideator" && techoracle == "Mideator") techoracle = e.oid;
        if (e.option_key == "Expert" && techoracle == "Expert") techoracle = e.oid;

        if (e.option_key == "Hindi" && hindi == "on") hindi = e.oid;
        if (e.option_key == "English" && english == "on") english = e.oid;
        if (e.option_key == "Gujarati" && gujarati == "on") gujarati = e.oid;
    });

    var emp_id = 0;

    // basic_data
    var sqlBasic = `insert into emp_master(f_name,l_name,designation,email,contact,gender,relation,address_1,address_2,city,state,
      zipcode,dob) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`
    var basic = await con.promise().query(sqlBasic,
        [first_name, last_name, designation, email, phone_number, gender, relationship, address, address2, city, state, zipcode, date_of_birth])

    console.log(basic);
    emp_id = basic[0].insertId;
    console.log(emp_id);


    // edu
    var sqlEdu = `insert into edu_master(emp_id,course,board,pass_year,percentage) values(?,?,?,?,?)`;
    for (let i = 0; i < course.length; i++) {
        await con.promise().query(sqlEdu, [emp_id, course[i], board[i], pass_year[i], percentage[i]])
    }

    // ref
    var sqlRef = `insert into ref_contact_master(emp_id,ref_name,contact,relation) values(?,?,?,?);`;
    console.log(ref_name);
    for (let i = 0; i < ref_name.length; i++) {
        await con.promise().query(sqlRef, [emp_id, ref_name[i], contact_name[i], relation_name[i]])
    }

    //  work-exp
    var sqlWork = `insert into work_exp_master(emp_id,company_name,designation,From_date,To_date) values(?,?,?,?,?);`;
    for (let i = 0; i < com_name.length; i++) {
        await con.promise().query(sqlWork, [emp_id, com_name[i], des[i], from[i], to[i]]);
    }

    // pref
    var sqlPref = `insert into pref_master(emp_id,location,notice_period,expected_CTC,current_CTC,department) values(?,?,?,?,?,?);`;
    await con.promise().query(sqlPref, [emp_id, location, notice, expCTC, curCTC, department]);

    // Tech
    var sqlTechphp = `insert into tech_master(emp_id,Tech_name,Tech_level) values(?,?,?);`;
    var sqlTechmysql = `insert into tech_master(emp_id,Tech_name,Tech_level) values(?,?,?);`;
    var sqlTechlaravel = `insert into tech_master(emp_id,Tech_name,Tech_level) values(?,?,?);`;
    var sqlTechoracle = `insert into tech_master(emp_id,Tech_name,Tech_level) values(?,?,?);`;

    if (php) await con.promise().query(sqlTechphp, [emp_id, php, techphp]);
    if (mysql) await con.promise().query(sqlTechmysql, [emp_id, mysql, techmysql]);
    if (laravel) await con.promise().query(sqlTechlaravel, [emp_id, laravel, techlaravel]);
    if (oracle) await con.promise().query(sqlTechoracle, [emp_id, oracle, techoracle]);

    // Lang

    var sqlLang = `insert into lang_master(emp_id,languages,can_read,can_write,can_speak) values(?,?,?,?,?);`;
    if (hindi) {
        if (hindi_read == "on") { hindi_read = 1 } else { hindi_read = 0 };
        if (hindi_write == "on") { hindi_write = 1 } else { hindi_write = 0 };
        if (hindi_speak == "on") { hindi_speak = 1 } else { hindi_speak = 0 };
        await con.promise().query(sqlLang, [emp_id, hindi, hindi_read, hindi_write, hindi_speak]);
    }

    if (english) {
        if (english_read == "on") { english_read = 1 } else { english_read = 0 };
        if (english_write == "on") { english_write = 1 } else { english_write = 0 };
        if (english_speak == "on") { english_speak = 1 } else { english_speak = 0 };
        await con.promise().query(sqlLang, [emp_id, english, english_read, english_write, english_speak]);
    }

    if (gujarati) {
        if (gujarati_read == "on") { gujarati_read = 1 } else { gujarati_read = 0 };
        if (gujarati_write == "on") { gujarati_write = 1 } else { gujarati_write = 0 };
        if (gujarati_speak == "on") { gujarati_speak = 1 } else { gujarati_speak = 0 };
        await con.promise().query(sqlLang, [emp_id, gujarati, gujarati_read, gujarati_write, gujarati_speak]);
    }
}

module.exports =
{
    getJobForm, postInsertJob
}
