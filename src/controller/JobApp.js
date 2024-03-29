var express = require("express")
var bodyparser = require("body-parser")
var con = require('../config/connect')
var app = express()
app.use(express.static("public"))
app.use(express.static('views'))
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const getJobForm = async (req, res) => {
    res.render('formValid')
}

const postJobForm = async (req,res) => 
{
  var {first_name,last_name,designation,email,phone_number,gender,relationship,address,address2,city,state,
  zipcode,date_of_birth} = req.body;

  var {course, board, pass_year, percentage} = req.body;
  var {ref_name,contact_name,relation_name} = req.body;
  var {com_name,des,from,to} = req.body;
  var {location,department,notice,expCTC,curCTC} = req.body;
  var {php,techphp,mysql,techmysql,laravel,techlaravel,oracle,techoracle} = req.body;
  var {hindi,hindi_read,hindi_write,hindi_speak,gujarati,gujarati_read,gujarati_write,gujarati_speak,
  english,english_read,english_write,english_speak} = req.body;

  var sql = `select option_master.oid,option_master.sid, option_master.option_key from select_master inner join 
  option_master on select_master.sid = option_master.sid `;
  SSC=0;HSC=0;Bachelor=0;Master=0;

  let result = await con.promise().query(sql);
  result[0].forEach(e => 
    {
      if(e.option_key == "Male" && gender == "male") gender = e.oid;
      if(e.option_key == "Female" && gender == "female") gender = e.oid;
      if(e.option_key == "Single" && relationship == "single") relationship = e.oid;
      if(e.option_key == "Married" && relationship == "married") relationship = e.oid;

      if(e.option_key == "PHP" && php == "on") php = e.oid;
      if(e.option_key == "Beginer" && techphp == "Beginer" ) techphp = e.oid;
      if(e.option_key == "Mideator" && techphp == "Mideator" ) techphp = e.oid;
      if(e.option_key == "Expert" && techphp == "Expert" ) techphp = e.oid;

      if(e.option_key == "Mysql" && mysql == "on") mysql = e.oid;
      if(e.option_key == "Beginer" && techmysql== "Beginer" ) techmysql = e.oid;
      if(e.option_key == "Mideator" && techmysql == "Mideator" ) techmysql = e.oid;
      if(e.option_key == "Expert" && techmysql == "Expert" ) techmysql= e.oid;

      if(e.option_key == "Laravel" && laravel == "on") myslaravelql = e.oid;
      if(e.option_key == "Beginer" && techlaravel== "Beginer" ) techlaravel = e.oid;
      if(e.option_key == "Mideator" && techlaravel == "Mideator" ) techlaravel = e.oid;
      if(e.option_key == "Expert" && techlaravel == "Expert" ) techlaravel= e.oid;

      if(e.option_key == "Oracle" && oracle == "on") oracle = e.oid;
      if(e.option_key == "Beginer" && techoracle== "Beginer" ) techoracle= e.oid;
      if(e.option_key == "Mideator" &&techoracle == "Mideator" ) techoracle = e.oid;
      if(e.option_key == "Expert" && techoracle== "Expert" ) techoracle= e.oid;

      if(e.option_key == "Hindi" && hindi == "on" ) hindi = e.oid;
      if(e.option_key == "English" && english == "on" ) english = e.oid;
      if(e.option_key == "Gujarati" && gujarati == "on" ) gujarati = e.oid;

    
      console.log(php);
    });

    var emp_id = 0;

    // basic_data
    var sqlBasic = `insert into emp_master(f_name,l_name,designation,email,contact,gender,relation,address_1,address_2,city,state,
    zipcode,dob) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`
    var basic = await con.promise().query(sqlBasic, 
      [first_name,last_name,designation,email,phone_number,gender,relationship,address,address2,city,state,zipcode,date_of_birth])
      
    console.log(basic);
    emp_id = basic[0].insertId;
    console.log(emp_id);

    var sqlEdu = `insert into edu_master(emp_id,course,board,pass_year,percentage) values(?,?,?,?,?)`;
    for(let i=0;i<course.length; i++)
    {
      await con.promise().query(sqlEdu, [emp_id,course[i],board[i],pass_year[i],percentage[i]])
    }

    // ref
    var sqlRef = `insert into ref_contact_master(emp_id,ref_name,contact,relation) values(?,?,?,?);`;
    console.log(ref_name);
    for(let i=0;i<ref_name.length; i++)
    {
      await con.promise().query(sqlRef, [emp_id,ref_name[i],contact_name[i],relation_name[i]])
    }

    //  work-exp
    var sqlWork = `insert into work_exp_master(emp_id,company_name,designation,From_date,To_date) values(?,?,?,?,?);`;
    for(let i=0;i<com_name.length; i++)
    {
      await con.promise().query(sqlWork, [emp_id,com_name[i],des[i],from[i],to[i]]);
    }

    // pref
    var sqlPref = `insert into pref_master(emp_id,location,notice_period,expected_CTC,current_CTC,department) values(?,?,?,?,?,?);`;
    await con.promise().query(sqlPref, [emp_id,location,notice,expCTC,curCTC,department]);

    // Tech

    var sqlTechphp = `insert into tech_master(emp_id,Tech_name,Tech_level) values(?,?,?);`;
    var sqlTechmysql = `insert into tech_master(emp_id,Tech_name,Tech_level) values(?,?,?);`;
    var sqlTechlaravel = `insert into tech_master(emp_id,Tech_name,Tech_level) values(?,?,?);`;
    var sqlTechoracle = `insert into tech_master(emp_id,Tech_name,Tech_level) values(?,?,?);`;

    if(php) await con.promise().query(sqlTechphp, [emp_id,php,techphp]);
    if(mysql) await con.promise().query(sqlTechmysql, [emp_id,mysql,techmysql]);
    if(laravel) await con.promise().query(sqlTechlaravel, [emp_id,laravel,techlaravel]);
    if(oracle) await con.promise().query(sqlTechoracle, [emp_id,oracle,techoracle]);

    // Lang
    
    var sqlLang = `insert into lang_master(emp_id,languages,can_read,can_write,can_speak) values(?,?,?,?,?);`;
    if(hindi)
    {
      if(hindi_read == "on"){hindi_read = 1}else{hindi_read = 0};
      if(hindi_write == "on"){hindi_write = 1}else{hindi_write = 0};
      if(hindi_speak == "on"){hindi_speak = 1}else{hindi_speak = 0};
      await con.promise().query(sqlLang, [emp_id,hindi,hindi_read,hindi_write,hindi_speak]);
    }

    if(english)
    {
      if(english_read == "on"){english_read = 1}else{english_read = 0};
      if(english_write == "on"){english_write = 1}else{english_write = 0};
      if(english_speak == "on"){english_speak = 1}else{english_speak = 0};
      await con.promise().query(sqlLang, [emp_id,english,english_read,english_write,english_speak]);
    }

    if(gujarati)
    {
      if(gujarati_read == "on"){gujarati_read = 1}else{gujarati_read = 0};
      if(gujarati_write == "on"){gujarati_write = 1}else{gujarati_write = 0};
      if(gujarati_speak == "on"){gujarati_speak = 1}else{gujarati_speak = 0};
      await con.promise().query(sqlLang, [emp_id,gujarati,gujarati_read,gujarati_write,gujarati_speak]);
    }

      // const selectQ = `select * from emp_master WHERE emp_id='${emp_id}' `;
      const selectQ = `select * from emp_master WHERE emp_id='${emp_id}' `;
      con.query(selectQ, (err,result) => 
      {
          if(err) throw err;
          console.log(result);
          res.render('listEmp' , {result})
      })
}

const getEmpData = async (req,res) => {
  var emp_id = req.params.emp_id;

  const updateQ = `select * from emp_master WHERE emp_id='${emp_id}' `;
  data = await con.promise().query(updateQ);
  result = data[0][0];

  updateQ2 = `select * from edu_master WHERE emp_id='${emp_id}' `;
  data2 = await con.promise().query(updateQ2);
  result2 = data2[0];

  updateQ3 = `select * from work_exp_master WHERE emp_id='${emp_id}' `;
  data3 = await con.promise().query(updateQ3);
  result3 = data3[0];

  updateQ4 = `select * from lang_master WHERE emp_id='${emp_id}' `;
  data4 = await con.promise().query(updateQ4);
  result4 = data4[0];

  var php =[];var laravel=[];var mysql=[];var oracle=[];
  updateQ5 = `select * from tech_master WHERE emp_id='${emp_id}' `;
  data5 = await con.promise().query(updateQ5);
  result5 = data5[0];
  result5.forEach(e => 
  {
    if(e.Tech_name === 12) php.push(e);
    if(e.Tech_name === 13) mysql.push(e);
    if(e.Tech_name === 14) laravel.push(e);
    if(e.Tech_name === 15) oracle.push(e);
  })

  updateQ6 = `select * from ref_contact_master WHERE emp_id='${emp_id}' `;
  data6 = await con.promise().query(updateQ6);
  result6 = data6[0];

  updateQ7 = `select * from pref_master WHERE emp_id='${emp_id}' `;
  data7 = await con.promise().query(updateQ7);
  result7 = data7[0];

  res.render('updateFormEmp',{result,result2,result3,result4,result5,result6,result7,php,mysql,laravel,oracle})
}


const updateFormPost =  async(req,res) => 
{
  var emp_id = req.params.emp_id;
  var {first_name,last_name,designation,email,phone_number,gender,relationship,address,address2,city,state,
  zipcode,date_of_birth} = req.body

  let updateRecord = ` update emp_master set f_name=?,l_name=?,designation=?,email=?,contact=?,gender=?,relation=?,address_1=?,
  address_2=?,city=?,state=?,zipcode=?,dob=? where emp_id = '${emp_id}'`;
  await con.promise().query(updateRecord,
     [first_name,last_name,designation,email,phone_number,gender,relationship,address,address2,city,state,zipcode,date_of_birth])
  
  // update exp
  var {com_name,des,from,to} = req.body;
  var work_exp_id = req.body.work_exp_id;
  let updateExp = `update work_exp_master set company_name=?,designation=?,From_date=?,To_date=? where emp_id = ${emp_id} and work_exp_id = ?`;
  if(com_name)
  {
    for(let i=0; i<com_name.length; i++)
    {
      await con.promise().query(updateExp, [com_name[i],des[i],from[i],to[i],work_exp_id[i]]);
    }
  }

  // update ref_contact
  var ref_id = req.body.ref_id;
  var {ref_name,contact_name,relation_name} = req.body;
  let updateRef = `update ref_contact_master set ref_name=?,contact=?,relation=? where emp_id = ${emp_id} and ref_id = ?`;
  if(ref_name)
  {
    for(let i=0; i<ref_name.length; i++)
    {
      await con.promise().query(updateRef, [ref_name[i],contact_name[i],relation_name[i],ref_id[i]]);
    }
  }

  // update pref
  var {location,department,notice,expCTC,curCTC} = req.body;
  let updatePref = `update pref_master set location=?,notice_period=?,expected_CTC=?,current_CTC=?,department=? where emp_id = ${emp_id}`;
  await con.promise().query(updatePref, [location,notice,expCTC,curCTC,department]);

  // update education

  var {course, board, pass_year, percentage} = req.body;
  var {eid} = req.body;
  let updateEdu = `update edu_master set course=?,board=?,pass_year=?,percentage=? where emp_id = ${emp_id} and eid = ?`;

  if(course)
  {
    for(let i=0; i<course.length; i++)
    {
      await con.promise().query(updateEdu, [course[i],board[i],pass_year[i],percentage[i],eid[i]]);
    }
  }

  var sqlGet = `select option_master.oid,option_master.sid, option_master.option_key from select_master inner join 
  option_master on select_master.sid = option_master.sid `;
  let resultTech = await con.promise().query(sqlGet);

  resultTech[0].forEach(e => 
    {
      if(e.option_key == "PHP" && php === "12") php = e.oid;
      if(e.option_key == "Beginer" && techphp == "Beginer" ) techphp = e.oid;
      if(e.option_key == "Mideator" && techphp == "Mideator" ) techphp = e.oid;
      if(e.option_key == "Expert" && techphp == "Expert" ) techphp = e.oid;

      if(e.option_key == "Mysql" && mysql === "13") mysql = e.oid;
      if(e.option_key == "Beginer" && techmysql== "Beginer" ) techmysql = e.oid;
      if(e.option_key == "Mideator" && techmysql == "Mideator" ) techmysql = e.oid;
      if(e.option_key == "Expert" && techmysql == "Expert" ) techmysql= e.oid;

      if(e.option_key == "Laravel" && laravel === "14") myslaravelql = e.oid;
      if(e.option_key == "Beginer" && techlaravel== "Beginer" ) techlaravel = e.oid;
      if(e.option_key == "Mideator" && techlaravel == "Mideator" ) techlaravel = e.oid;
      if(e.option_key == "Expert" && techlaravel == "Expert" ) techlaravel= e.oid;

      if(e.option_key == "Oracle" && oracle === "15") oracle = e.oid;
      if(e.option_key == "Beginer" && techoracle == "Beginer" ) techoracle= e.oid;
      if(e.option_key == "Mideator" &&techoracle == "Mideator" ) techoracle = e.oid;
      if(e.option_key == "Expert" && techoracle== "Expert" ) techoracle= e.oid;

      if(e.option_key == "Hindi" && hindi == "Hindi" ) hindi = e.oid;
      if(e.option_key == "English" && english == "English" ) english = e.oid;
      if(e.option_key == "Gujarati" && gujarati == "Gujarati" ) gujarati = e.oid;
    });

   // update lang
  var {hindi,hindi_read,hindi_write,hindi_speak,gujarati,gujarati_read,gujarati_write,gujarati_speak,
    english,english_read,english_write,english_speak} = req.body;
    var lan_id = req.body.lan_id;
  var sqlLang1 = `update lang_master set languages=?,can_read=?,can_write=?,can_speak=? where emp_id = ${emp_id} and lan_id = ?`;
  if(hindi)
  {
    console.log(sqlLang1);
    if(hindi_read == "on"){hindi_read = 1}else{hindi_read = 0};
    if(hindi_write == "on"){hindi_write = 1}else{hindi_write = 0};
    if(hindi_speak == "on"){hindi_speak = 1}else{hindi_speak = 0};
    await con.promise().query(sqlLang1, [hindi,hindi_read,hindi_write,hindi_speak,lan_id[0]]);
  }
  if(english)
  {
    if(english_read == "on"){english_read = 1}else{english_read = 0};
    if(english_write == "on"){english_write = 1}else{english_write = 0};
    if(english_speak == "on"){english_speak = 1}else{english_speak = 0};
    await con.promise().query(sqlLang1, [english,english_read,english_write,english_speak,lan_id[1]]);
  }
  if(gujarati)
  {
    if(gujarati_read == "on"){gujarati_read = 1}else{gujarati_read = 0};
    if(gujarati_write == "on"){gujarati_write = 1}else{gujarati_write = 0};
    if(gujarati_speak == "on"){gujarati_speak = 1}else{gujarati_speak = 0};
    await con.promise().query(sqlLang1, [gujarati,gujarati_read,gujarati_write,gujarati_speak,lan_id[2]]);
  }


  // update tech
  var {php,techphp,mysql,techmysql,laravel,techlaravel,oracle,techoracle} = req.body;
  var tech_id = req.body.tech_id;

  var updateTech = `update tech_master set Tech_name=?,Tech_level=? where emp_id = ${emp_id} and tech_id = ?`;
    
  if(php) await con.promise().query(updateTech, [php,techphp,tech_id[0]]);
  if(mysql) await con.promise().query(updateTech, [mysql,techmysql,tech_id[1]]);
  if(laravel) await con.promise().query(updateTech, [laravel,techlaravel,tech_id[2]]);
  if(oracle) await con.promise().query(updateTech, [oracle,techoracle,tech_id[3]]);


  res.send("Data Updated");

}


module.exports =
{
    getJobForm,postJobForm,getEmpData,updateFormPost
}
