const mysql =require('mysql');

const express = require('express');
var app = express();
const bodyparser = require('body-parser');
var cors = require('cors');

app.use(bodyparser.json());


app.use(cors());



var mysqlConnection = mysql.createConnection({
host: '',
user: '',
password: '',
database: '',
});

mysqlConnection.connect((err) => {
if(!err){
console.log('db connection Success');
}else{
console.log('db connection Error: '+ JSON.stringify(err, undefined, 2));    
}
}
);

app.listen(3000, () => 
console.log('Hello world')
);



app.get('/users', (req, res)=> {
    

mysqlConnection.query('SELECT * from users', (err, rows, fields)=> {
if(!err){
    res.send(rows);
}else {
    console.log('error');
}
})

});

app.get('/users/:id', (req, res)=> {
	


	mysqlConnection.query('SELECT * from users WHERE idUser = ?',[req.params.id],(err, rows, fields)=> {
	if(!err){
		res.send(rows);
	}else {
		console.log('error');
	}
	})
	
	});

	app.delete('/users/:id', (req, res)=> {
    
		mysqlConnection.query('DELETE FROM users WHERE idUser = ?',[req.params.id],(err, rows, fields)=> {
		if(!err){
			res.send('User deleted successfully.');
		}else {
			console.log('error');
		}
		})
		
		});	


		app.post('/users', (req, res)=> {

				
var userData = req.body;			


var sql = "INSERT INTO users (name, email, description) VALUES (?, ?, ?)";    
			mysqlConnection.query(sql, [userData.user_name,userData.user_email,userData.user_description],  (err, rows, fields)=> {
			if(!err){
				res.send('User aded successfully.');
				console.log('User aded successfully.');
			}else {
				console.log('error post');
			}
			})
			
			});	

			

			app.put('/users/:id', (req, res)=> {

var userData = req.body;

/*
var bodyValue = {
id: 6, 	
name: 'Santo',
email: 'santo@gmail.com',
description: 'work-4'	
}
*/

console.log(userData);
				
var sql = "UPDATE users SET name=?, email=?, description=? WHERE idUser = ?";
				   
mysqlConnection.query(sql,[userData.user_name,userData.user_email,userData.user_description,req.params.id],  (err, rows, fields)=> {
							if(!err){
								res.send('User aded successfully.');
							}else {
								console.log('error');
							}
							})
							
							});		
									



/*

	fetch('http://localhost:3000/users', {
		headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
		method: 'GET',
		mode: 'cors'
		})
		  .then(response => response.json())
		  .then(result => { 
			console.log('A')
			  console.log(result)
			  console.log('Z')
		
		
			})
			*/