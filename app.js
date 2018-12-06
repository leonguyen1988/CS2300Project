
//
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'banbethin1',
  database : 'sql_learn'
  });

app.get('/',(req,res) =>{
   res.sendFile("index.html",{"root":__dirname});
});

app.get('/tutorial',(req,res) =>{
    res.sendFile("tutorial1.js",{"root":__dirname});
});

app.get('/main',(req,res) =>{
  res.sendFile("main.html",{"root":__dirname});
});

app.post('/user',(req,res)=>{
   var user = body.req.user;
  connection.query('')
});
/*
  checking the user ID, missing pass value
*/
app.post('/login',(req,res)=>{
    var user=req.body.user;
    var query ='SELECT Count(learning.CurrentPoint) as PointCount,'+
                'Count(project.ProjectName) as ProjectCount'+ 
                ' from learning,project,(SELECT '+
                                'UserID FROM users where UserName="'+user+'")'+'as A'+
                 ' where learning.NameID = A.UserID and project.UID=A.UserID;';
    
    connection.query(query , function (err, rows, fields) {
    if (err) throw err;
      value=[rows[0].PointCount,rows[0].ProjectCount];
      res.json(value);
    });
});

/*
  Create the user ID
*/
app.post('/create',(req,res)=>{
    var username = req.body.user;
    var password = req.body.password;
    var email = req.body.email;
    // var mysql = require('mysql');
    // var connection = mysql.createConnection({
    //   host     : 'localhost',
    //   user     : 'root',
    //   password : 'banbethin1',
    //   database : 'sql_learn'
    // });
    UserNameChecking = 'SELECT COUNT(*) as NameCount from users where Username ="'+String(username)+'";';
    EmailChecking ='SELECT COUNT(*) as EmailCount from users where Email="'+String(email)+'";';
    InsertValue = 'INSERT INTO users (UserName,PW,Email,) VALUES (?,?,?)';
    
    connection.query(UserNameChecking,function(err,result){ 
      if(err) throw err;                  
      if(result[0].NameCount ===0){          
          connection.query(EmailChecking,function(err,rows,files){
              if (err) throw err;
              if(rows[0].EmailCount===0){
                  connection.query(InsertValue,[username,password,email],function(err,rows,fields){
                      if(err) throw err;
                      res.json("Succeed");
                    });
              }else{
                res.json("Email");
              }
          });
      }else{
        res.json("Name");
      }
  });
  
});

// 
app.listen(5656,function (){
    console.log('http://localhost:5656');
});

