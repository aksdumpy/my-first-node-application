var express =require("express");
require('dotenv').config();
var app = express();
var mysql=require("mysql");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
var request = require('request');


var connection = mysql.createConnection({
 
 host: process.env.DB_HOST,
 port:process.env.DB_PORT,
 user:process.env.DB_USER,
 password:process.env.DB_PASSWORD,
 database:process.env.DB_NAME
});


app.get("/",function(req,res){


res.redirect('/bbdu');
});

app.get("/bbdu",function(req,res){

res.render("bbdu");

});

app.post("/bbdures",function( req,res){
    // console.log(req.body.roll_no);
    // console.log(req.body.mother_name);
    // console.log(req.body.student_name);
    var roll_no= req.body.roll_no;
    var mother_name= req.body.mother_name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/123456789]/gi, '').toUpperCase();
    var student_name= req.body.student_name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/123456789]/gi, '').toUpperCase();
    console.log("SomeOne Requested For Result"+"|  "+roll_no+"|"+"|   "+student_name+"|"+"| "+mother_name+"|");

//var q="SELECT * FROM bca2017 WHERE university_roll_number="+roll_no;
var q="SELECT * FROM bca2017 WHERE university_roll_number="+roll_no+ " AND mother_name LIKE \'"+mother_name+"\'AND name LIKE\'"+student_name+"%\'" ;
connection.query(q,function(err,results){

if (err){
      res.redirect("/bbdu");
}

if (typeof results[0]!=='undefined')
{  
//res.send(results[0]); // it is array of object  so choosing the first object
res.render("individualstudentbca2017",results[0]);
}
else
  {
res.redirect("/resnotfound");


   }
});
    
});


app.get("/resnotfound", function(req, res) {
    res.render("result_not_found");
});
app.get("/resultanalysis", function(req, res) {
    res.render("resultanalysis");
});





app.get("/*",function(req,res){
    
    res.redirect("/bbdu");
});

var SERVER_PORT = 8080;

app.listen(SERVER_PORT,function()
{
    console.log("server started !! at port "+SERVER_PORT);
});
