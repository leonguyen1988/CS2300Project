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
function TestUserLogin(){
    var user = "HuuTho";
    var password = "a";
    var email = "nguyenhuutho1988@gmail.com";
    var id= null;
    var value=[];
    connection.query('SELECT UserID from users where username = "'+user+'"'+
                            'AND PW= "'+password+'";',function(err,rows,fields){
        if(err) throw err;
        id =rows.length;
        if(id !== 0){
            connection.query('SELECT Count(CurrentPoint) as C from learning where PublisherID='+String(id)+';',function(err,rows) {
                if (err) throw err;
                value.push(rows[0].C);
                connection.query('SELECT Count(UID) as A from project where UID='+String(id)+';',function(err,rows){
                    if(err) throw err;
                    value.push(rows[0].A);
                    console.log(value);
                });
            });
        }else{
            console.log("Passed the Test!");
        }
    });

}

function TestQuiz(){
  var user= "HuuTho";
  var tutorial= "Table Creation";
  var point = 3;   
  var tuID=null;
  var NameID=null;
  connection.query('SELECT NameID From Tutorial where Name="'+tutorial+'";',function(err,rows){
      if(err) throw err;
      tuID =rows[0].NameID;
      connection.query('SELECT UserID From users where userName="'+user+'";',function(err,rows){
        if(err) throw err;
        NameID =rows[0].UserID;
        var query='Insert into learning(NameID,CurrentPoint,SupportedLanguages,PublisherID) values ('+
              String(tuID)+','+String(point)+',"SQL",'+NameID+');';
        connection.query(query,function(err,rows){
            if(err) throw err;
            console.log("Passes test!!!");
        });       
      });
    });
};
// TestUserLogin();
TestQuiz();
    