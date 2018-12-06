var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var username = "leo";
    var password = "123";
    var email = "nguyenhuutho1988@gmail.com";
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'banbethin1',
      database : 'sql_learn'
    });
    UserNameChecking = 'SELECT COUNT(*) as NameCount from users where Username ="'+String(username)+'";';
    EmailChecking ='SELECT COUNT(*) as EmailCount from users where Email="'+String(email)+'";';
    var query ='SELECT Count(learning.CurrentPoint) as PointCount,'+
                'Count(project.ProjectName) as ProjectCount'+ 
                ' from learning,project,(SELECT '+
                                'UserID FROM users where UserName="'+'HuuTho'+'")'+'as A'+
                 ' where learning.NameID = A.UserID and project.UID=A.UserID;';
    

    connection.query(query , function (err, rows, fields) {
    if (err) throw err;
        data=[rows[0].PointCount,rows[0].ProjectCount];
        console.log(data);
    });
    