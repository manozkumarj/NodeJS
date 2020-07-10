/*************************************************************************************/
/****************** USING EXPRESS and CORS FOR MAKING THINGS SIMPLER **************************/
/*************************************************************************************/
/*eslint-disable no-unused-params */
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());
app.options('*', cors()); // include before other routes
const port = 6688;


/*************************************************************************************/
/******************* CONVERTING RETURNED DATA TO JSON ********************************/
/*************************************************************************************/
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
//end of converting returned data to json


/*************************************************************************************/
/*************************** MYSQL HANDLING CODE *************************************/
/*************************************************************************************/

// Require process, so we can mock environment variables
const process = require('process');
const mysql = require('mysql');
const aes256 = require('aes256');
const config = require('./config');
// const password = aes256.decrypt(typeof x, config.password);
const password = config.password;

const con = mysql.createConnection({
	connectionLimit: 100, //important
	host: config.host, //process.env.SQL_CONNECTION_NAME,
	user: config.user, //process.env.SQL_USER,
	password: password, //process.env.SQL_PASSWORD,
	database: config.database, //process.env.SQL_DATABASE,
});

con.connect(function(err) {
  if (err) {
		console.log("Error, Connection was failed");
		console.log("sqlMessage => " + err.sqlMessage);
		console.log("errno => " + err.errno);
		console.log("code => " + err.code);
		// console.log(err);
		// console.log("Error, Connection was failed", err );
	} else {
		console.log("Successfully connected to MySQL's db --> " + config.database);
	}

  // FMD - https://www.w3schools.com/nodejs/nodejs_mysql.asp

  /*  Database creation  */
  // con.query("CREATE DATABASE mydb", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });

  /*  Table creation  */
  // var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");

});

function sendResponseNormal(rows, res) {
	res.json(rows);
}


/**************************************************************************************/
/*********                     WEB APPLICATION API CALLS              *****************/
/**************************************************************************************/

//get node id (client's connected to this API will use this node id)
app.get('/node_details', function (req, res) {
	var projectName = config.project_name;
	var deploymentType = config.deployment_type;
	if (deploymentType)
		res.json({ "project_name": projectName, "deployment_type": deploymentType, "responseStatus": responseStatus });
	else
		res.json({ "error": "Something went wrong while fetching the node id. Please contact admin." });
});

var request = require('request');
var responseStatus = "true";

var FCM = require('fcm-node');
//put your server key here
var serverKey = 'AAAAhaFoIkY:APA91bFgnGzZoGv6s0fd6fiJ6PMZemLPvnpgYopmjc_PQxNg7toOPp6BSZGDYHh5zZHpZSk5uBl4w2kwxQQo6rnlGBNuBQHg3Ljw33OzmCP7hqWqVquKmGVh0WiJbQ7dWPpHMf9n5AfF';
var fcm = new FCM(serverKey);

// setInterval(function () {
// 	initiator();
// }, 3600000);

// Inserting items
app.post('/insertItems', function (req, res) {
	var items = req.body.value;
	console.log("Received items = " + items);
	console.log(typeof(items));
	items = Object.values(items);
	items = items.forEach(item => {
		return item;
	});
	console.log(items);

	itemsArray = items.split(",");
	console.log(itemsArray);

	// var sample = [['aa'], ['bb']];
	// console.log(sample);

  	var sql = `INSERT INTO items (value) VALUES ?`;
	con.query(sql, [itemsArray], function (err, result, fields) {
		console.log("From /insertItem");
	    if (err) console.log(err);
	    console.log("Item Inserted - "+ items);
	    res.send(result);
	});

	// console.log("done -> " + done);
	// console.log("value -> " + value);

	// res.send({hasError: false, canInsert: true});
});


// Inserting items
app.post('/storeToken', function (req, res) {
    console.log("Received is -> " + JSON.stringify(req.body));	
	var token = req.body.token;
    console.log("Token is -> " + token);	

  	var sql = `INSERT INTO tokens (token) VALUES ('${token}')`;
	con.query(sql, function (err, result, fields) {
		console.log("From /storeToken");
	    if (err) console.log(err);
	    console.log("token Inserted - "+ token);
	    res.json(result);
	});
});


// Fetching items
app.get('/getTokens', function (req, res) {

    var token_array = [];

  	var sql = `SELECT * FROM tokens ORDER BY id DESC`;
	con.query(sql, function (err, result, fields) {
	    if (err) console.log(err);
	
    for (let i = 0; i < result.length; i++) {
    	console.log(result[i]);
        token_array.push(result[i]);
    }

    // for (let i = 0; i < token_array.length; i++) {
    //     var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    //         to: token_array[i].token,
    //         collapse_key: 'pinkk',

    //         notification: {
    //             title: 'Title of your push notification',
    //             body: 'Body of your push notification'
    //         },

    //         data: {  //you can send only notification or only data(or include both)
    //             my_key: 'my value',
    //             my_another_key: 'my another value'
    //         }
    //     };

    //     fcm.send(message, function (err, response) {
    //         if (err) {
    //             console.log("Something has gone wrong!");
    //             console.log(err);
    //         } else {
    //             console.log("Successfully sent with response: ", response);
    //         }
    //     });
    // }

	    res.json(result);
	});
});


app.listen(port, () => {
	console.log('Server is listening on port --> ' + port);
});




















