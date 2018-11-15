const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'EmployeeDB'

});

mysqlConnection.connect((err)=>{
	if(!err)
		console.log('db connection is ok');
	else
		console.log('db connection failed \n Error:'+JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('express server is running at port no: 3000'));

// get all employees
app.get('/employees',(req,res)=>{
	mysqlConnection.query('SELECT * FROM Employee',(err,rows,fields)=>{
		if(!err)
		console.log(rows);
		else
		console.log(err);
	})

});