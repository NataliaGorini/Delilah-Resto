Delilah-Resto
Rest API using express, nodejs, MySQL and Javascript info: description: "Add user, create orders and manage them with MySQL db" version: "1.0.0" title: "Delilah Resto" contact: email: "natygorini@gmail.com" basePath: "/v2"

GITHUB REPOSITORY => https://github.com/NataliaGorini/Delilah-Resto.git

#DATABSE SQL:
You can create your DB install mysql => npm i mysql2.
After that you need to run the queries available on the file "db.sql" on the repository


#SERVER: 
Configure your express server after install NodeJS:
-npm install express
-requiere your express server. 
	Example: const express = require('express'); const app = express();
-Then you must put your server listening by selecting a port: 
	Example: app.listen(3000, () => {console.log('starting')}) 

NOTE---- THIS API IS USING LOCAL HOST----


#POSTMAN:
You can access to the postman collection to test the endpoints

--- YOU CAN FIND COMPLETE DOCUMENTATION WITH SCHEMES, PATH, ENDPOINTS AND MORE ON THE YAML FILE ON THE REPOSITORY ---
