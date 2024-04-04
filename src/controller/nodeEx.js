var express = require("express")
var bodyparser = require("body-parser")
var con = require('../config/connect')
var app = express()
app.use(express.static("public"))
app.use(express.static('views'))
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const getAtt = async (req, res) => {
    const p = req.query.page || 1;
    const offset = (p - 1) * 40;
    const lastpage = 3;
    const month = req.query.month || 'december';

    var m;
    if (month == 'december') {
        m = 12;
    }
    else if (month == 'january') {
        m = 1;
    }
    else {
        m = 2;
    }

    sql = `select student_masterr.stu_id, student_masterr.stu_name, count(student_masterr.stu_id) As "Present_Day" 
      from student_masterr, attMaster where
      student_masterr.stu_id = attMaster.stu_id and
      attMaster.att_log = "1" and
      Month(attMaster.date_of_month) = "${m}" group by student_masterr.stu_id order by student_masterr.stu_id 
      limit 40 offset ${offset};`

    con.query(sql, (err, result) => {
        if (err) throw err;
        res.render('attendance', { result, p, month, m, lastpage })
    })
};

const getMysqlTableGen = async (req, res) => {
    try {
        const result = [];
        if (req.query.textq) {
            const p = req.query.page || 1;
            var Usersql = req.query.textq;

            con.query(Usersql, (err, result) => {
                if (err) throw err;
                else {
                    const limit = 5;
                    const lastlimit = Math.ceil(result.length / limit);
                    const offset = (Number(p) - 1) * limit;
                    var rangeSql = Usersql + ` limit ${limit} offset ${offset}`;
                    const key = Object.keys(result[0]);

                    con.query(rangeSql, (err, result) => {
                        if (err) throw err;
                        else
                            res.render('input', { result, key, Usersql, p, lastlimit });
                    })
                }
            })
        }
        else {
            res.render('input', { result })
        }
    }
    catch (err) {
        throw err;
    }
}

const getResultGrid = async (req, res) => {
    const page = req.query.page || 1;
    const limit = 30;
    const offset = (page - 1) * limit;

    const sql = `select e.stu_id, s.stu_name, t.exam_name,
      sum(e.obt_practical) as prac , sum(e.obt_thoery) as th
      from exam_master as e inner join student_masterr as s
      on e.stu_id = s.stu_id
      inner join exam_type as t
      on e.examtype_id = t.examtype_id
      group by t.examtype_id,s.stu_id order by e.stu_id limit ${limit} offset ${offset}`

    con.query(sql, (err, result) => {
        if (err) throw err;
        res.render('list', { result, page })
    })
}

const getReportResult = async (req, res) => {
    const stuId = req.query.stu_id;

    let oneRecord =
        `select student_masterr.stu_id, student_masterr.stu_name, exam_master.examtype_id, subject_master.sub_name,
    exam_master.obt_practical, exam_master.obt_thoery,exam_master.total_obt
    from student_masterr,exam_master,subject_master where student_masterr.stu_id = exam_master.stu_id 
    and subject_master.sub_id = exam_master.subj_id and student_masterr.stu_id = ${stuId};`

    const attRecord = `select count(*) as Present_Day from attMaster where stu_id = ${stuId} and att_log = 1;`
    con.query(oneRecord, (err, result) => {
        let singleUser;
        if (err) console.log(err)
        singleUser = result;
        con.query(attRecord, (err, result1) => {
            if (err) throw err;
            else console.log(result1)
            res.render('view', { singleUser, result1 })
        })
    })
}

const getAttResult = async (req, res) => {
    const month = req.query.month || 'december';
    const stuId = Number(req.query.stu_id) || 1;

    var m;
    if (month == 'december') {
        m = 12;
    }
    else if (month == 'january') {
        m = 1;
    }
    else {
        m = 2;
    }

    sql = `select student_masterr.stu_id, student_masterr.stu_name, count(student_masterr.stu_id) As "Present_Day" from
      student_masterr, attMaster where
      student_masterr.stu_id = attMaster.stu_id and
      attMaster.att_log = 1 and
      Month(attMaster.date_of_month) = ${m} and student_masterr.stu_id = ${stuId};`;

    con.query(sql, (err, result) => {
        let singleUser;
        singleUser = result;
        if (err) throw err;
        res.render('attResult', { singleUser: singleUser, stuId, month, m })
    })
};

const getStudentSort = async (req, res) => {
    let page = req.query.page || 1;

    if (page > 10 || page < 0) {
        res.redirect('/');
    }

    const limit = 100;
    const order = req.query.order || 'asc';
    const offset = (page - 1) * limit;

    const query = `select * from studentMaster order by stu_id ${order} limit ${limit} offset ${offset}`
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        res.render('stuSort', { result, page, order })
    })
}

const getSearchDel = async (req, res) => {

    var sql = `select * from student_masterr`;
    const input = req.query.input;

    stu_name = "";
    age = "";
    course = "";
    city = "";
    university = "";

    let arr = [];
    let prechar = '';

    if (req.query.input) {
        for (i = 0; i < input.length; i++) {
            if (input[i] == '@' || input[i] == '#' || input[i] == '$' || input[i] == '%' || input[i] == '^') {
                if (prechar != "") {
                    arr.push(prechar);
                    prechar = "";
                }
                prechar += input[i];
            }
            else {
                prechar += input[i];
                if (i === input.length - 1 || input[i + 1] == '@' || input[i + 1] == '#' || input[i + 1] == '$' || input[i + 1] == '%' || input[i + 1] == '^') {
                    arr.push(prechar);
                    prechar = "";
                }
            }
        }
    }

    var sname = [];
    var course1 = [];
    var age1 = [];
    var city1 = [];
    var uni = [];

    arr.forEach((e) => {
        if (!sql.includes('where')) sql += ` where `;
        if (e.charAt(0) == '@') sname.push(`stu_name like '%${e.slice(1)}%'`)
        if (e.charAt(0) == '#') course1.push(`course like '%${e.slice(1)}%'`)
        if (e.charAt(0) == '$') age1.push(`age like '%${e.slice(1)}%'`)
        if (e.charAt(0) == '%') city1.push(`city like '%${e.slice(1)}%'`)
        if (e.charAt(0) == '^') uni.push(`university like '%${e.slice(1)}%'`)
    });

    if (sname.length > 0) sql += sname.join(" OR ") + " AND ";
    if (course1.length > 0) sql += course1.join(" OR ") + " AND ";
    if (age1.length > 0) sql += age1.join(" OR ") + " AND ";
    if (city1.length > 0) sql += city1.join(" OR ") + " AND ";
    if (uni.length > 0) sql += uni.join(" OR ") + " AND ";

    if (sql.includes('where')) sql = sql.slice(0, -4);

    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.render('search_del', { result, input })
        }
    })
}

const getSearchID = async (req, res) => {

    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const stu_id = req.query.stu_id;
    const stu_name = req.query.stu_name;
    const course = req.query.course;
    const age = req.query.age;
    const university = req.query.university;

    const choose = req.query.choose;

    try {
        if (stu_id) {
            var sql = `select * from student_masterr where stu_id=${stu_id} limit ${limit} offset ${offset}`
        }
        else {
            let arr = [];
            if (stu_name) arr.push(`stu_name = '${stu_name}'`)
            if (course) arr.push(`course = '${course}'`)
            if (age) arr.push(`age = '${age}'`)
            if (university) arr.push(`university = '${university}'`)

            let where = '';
            if (arr.length > 0) {
                where = 'where ' + arr.join(` ${choose} `)
            }
            sql = `select * from student_masterr ${where} limit ${limit} offset ${offset}`;
        }

        con.query(sql, (err, result) => {
            if (err) throw err;
            else {
                res.render('search_id', { page, limit, result, stu_name, course, age, university })
            }
        })
    }
    catch (err) {
        console.error(err);
    }
}

const getSortCols = async (req, res) => {
    let page = req.query.page || 1;

    const limit = 10;
    const last = Math.ceil(100 / limit)
    const offset = (page - 1) * limit;

    const sortorder = req.query.sort === 'desc' ? 'desc' : 'asc';
    const sortField = req.query.select || 'stu_id';

    const query = `select * from studentMaster order by ${sortField} ${sortorder} limit ${limit} offset ${offset}`
    con.query(query, (err, result, fields) => {
        if (err) throw err;
        res.render('sortAllCol', { result, page, last, sortorder, sortField })
    })
}

const getPosts = async (req, res) => {
    try {
        res.render('jsonPost_index')
        // res.sendFile(path.join(__dirname , "views" , "/index.html"))
    }
    catch (error) {
        console.error(error)
    }
}

const getIdPost = async (req, res) => {
    try {
        res.render('jsonPostdetails')
        // res.sendFile(path.join(__dirname , "views" , "/details.html"))
    }
    catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAtt, getMysqlTableGen,
    getResultGrid, getReportResult, getAttResult,
    getStudentSort, getSearchDel, getSearchID, getSortCols,

    getPosts, getIdPost
}