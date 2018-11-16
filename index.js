const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'EmployeeDB',
	multipleStatements: true

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
		res.send(rows);
		else
		console.log(err);
	})

});


// get an employee
app.get('/employees/:id',(req,res)=>{
	mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?',[req.params.id],(err,rows,fields)=>{
		if(!err)
		res.send(rows);
		else
		console.log(err);
	})

});


// delete an employee
app.delete('/employees/:id',(req,res)=>{
	mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?',[req.params.id],(err,rows,fields)=>{
		if(!err)
		res.send('DELETED SUCCESSFULLY');
		else
		console.log(err);
	})

});


// INSERT AN EMPLOYEE
app.post('/employees',(req,res)=>{
	let emp = req.body;
	var sql = "SET @EmpID=?;SET @Name=?;SET @EmpCode=?;SET @Salary=?;CALL new_procedure(@EmpID,@Name,@EmpCode,@Salary);";
	mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
		if(!err)
			rows.forEach(element =>{
				if(element.constructor == Array)
					res.send('iserted employ id :' +element[0].EmpID);
			});
		
		else
		console.log(err);
	})

});

app.put('/employees',(req,res)=>{
	let emp = req.body;
	var sql = "SET @EmpID=?;SET @Name=?;SET @EmpCode=?;SET @Salary=?;CALL new_procedure(@EmpID,@Name,@EmpCode,@Salary);";
	mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
		if(!err)
			res.send('user updated')
		
		else
		console.log(err);
	})

});