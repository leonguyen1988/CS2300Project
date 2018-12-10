
// Set up connection from NodeJS to MySQL and installing the Express lirbary

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

app.get('/Quiz1',(req,res)=>{
  res.sendFile("Quiz1.html",{"root":__dirname});
});

app.get('/Quiz2',(req,res)=>{
  res.sendFile("Quiz2.html",{"root":__dirname});
});

app.get('/Quiz3',(req,res)=>{
  res.sendFile("Quiz3.html",{"root":__dirname});
});

app.get('/Setting',(req,res)=>{
  res.sendFile("Setting.html",{"root":__dirname});
})

/*
  Login Post Method will get username and pass and 
*/
app.post('/login',(req,res)=>{
  var user=req.body.user;
  var password = req.body.password;
  var id= null;
  var value =[];
  connection.query('SELECT UserID from users where username = "'+user+'"'+
                          'AND PW= "'+password+'";',function(err,rows,fields){
      if(err) throw err;
     
      if(rows.length !== 0){
        id =rows[0].UserID;
          connection.query('SELECT SUM(CurrentPoint) as Points from learning where PublisherID='+String(id)+';',function(err,rows) {
              if (err) throw err;
              value.push(rows[0].Points);
              connection.query('SELECT Count(UID) as Project from project where UID='+String(id)+';',function(err,rows){
                  if(err) throw err;
                  value.push(rows[0].Project);
                  res.json(value);
              });
          });
      }else{
        res.json(value);
      }
  });
});

/*
*/
app.post('/userTakeTutorial',(req,res)=>{
   var user = req.body.user;
   var name = req.body.name;
  connection.query('SELECT COUNT(NameID) as count from learning'+
                    ' where NameID=(SELECT NameID from tutorial where Name="'+name+'")'+
                    ' AND PublisherID =(SELECT UserID from Users where userName="'+user+'");',
                    function(err,result){
                      if(err) throw err;
                      if(result[0].count === 0){
                        connection.query('Insert into Learning(NameID,SupportedLanguages,PublisherID) values'+
                        '( (SELECT NameID from tutorial where Name="'+name+'"),'+
                        '"SQL",(SELECT USERID from Users where UserName="'+user+'" )) ;',
                        function(err,result){
                          if(err) throw err;
                          console.log("done");
                        });
                      }
                    });
});

/*
  This function will get userName,tutorial andpoint when user done with the quiz page
  Funtuon will insert  these parameters into the table learning
 */

app.post('/QuizPoint',(req,res)=>{
  var user= req.body.user;
  var tutorial= req.body.tutorial;
  var point = req.body.point;
  var value=[];  
  var tuID=null;
  var NameID=null;
  /**
   * Outer Query will get tutorial ID from tutorial Database from tutorial parameter
   */
  connection.query('SELECT NameID From Tutorial where Name="'+tutorial+'";',function(err,rows){
      if(err) throw err;
      tuID =rows[0].NameID;
      /**
       * This query will be fired to get User ID
       */
      connection.query('SELECT UserID From users where userName="'+user+'";',function(err,rows){
        if(err) throw err;
        NameID =rows[0].UserID;
        
        connection.query('SELECT CurrentPoint from learning where PublisherID= '+
                          String(NameID)+
                          ' and NameID = '+
                          String(tuID)+';',function(err,rows){
                              if(err) throw err;
                              point = rows[0].CurrentPoint + parseInt(point);
                              connection.query(' Update learning SET CurrentPoint = '+ 
                                                String(point) + 
                                                ' where PublisherID='+
                                                String(NameID)+
                                                ' and NameID='+
                                                String(tuID)+';',function(err,rows){
                                                    if(err) throw err;
                                                    connection.query('SELECT SUM(CurrentPoint) as Points from learning where PublisherID='+
                                                                      String(NameID)+';',
                                                                      function(err,rows) {
                                                                      if (err) throw err;
                                                                        value.push(rows[0].Points);
                                                                        connection.query('SELECT Count(UID) as Project from project where UID='+
                                                                                          String(NameID)+';',
                                                                                      function(err,rows){
                                                                                      if(err) throw err;
                                                                                        value.push(rows[0].Project);
                                                                                        res.json(value);
                                                                                      });
                                                                      });
                                                });
                          });       
      });
    });  
});

/*
  Create the user ID
*/
app.post('/create',(req,res)=>{
    var username = req.body.user;
    var password = req.body.password;
    var email = req.body.email;
    UserNameChecking = 'SELECT COUNT(*) as NameCount from users where Username ="'+String(username)+'";';
    EmailChecking ='SELECT COUNT(*) as EmailCount from users where Email="'+String(email)+'";';
    InsertValue = 'INSERT INTO users (UserName,PW,Email) VALUES (?,?,?)';
    
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

