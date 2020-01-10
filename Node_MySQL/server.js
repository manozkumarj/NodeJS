/*****************************************************************/
/*****************************************************************/
/******************                          *********************/
/******************   [PROJECT NAME] API     *******************/
/******************                          *********************/
/*****************************************************************/
/*****************************************************************/


/*************************************************************************************/
/*************** USING EXPRESS and CORS FOR MAKING THINGS SIMPLER ********************/
/*************************************************************************************/
/*eslint-disable no-unused-params */
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());
app.options('*', cors()); // include before other routes


/*************************************************************************************/
/******************* CONVERTING RETURNED DATA TO JSON ********************************/
/*************************************************************************************/
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
//end of converting returned data to json


/*************************************************************************************/
/*************************** MYSQL HANDLING CODE *************************************/
/*************************************************************************************/

// Require process, so we can mock environment variables
const process = require('process');
const mysql = require('mysql');
const aes256 = require('aes256');
const config = require('./config');
const password = aes256.decrypt(typeof x, config.password);

var pool = mysql.createPool({
	connectionLimit: 100, //important
	host: config.host, //process.env.SQL_CONNECTION_NAME,
	user: config.user, //process.env.SQL_USER,
	password: password, //process.env.SQL_PASSWORD,
	database: config.database, //process.env.SQL_DATABASE,
	debug: false,
	dateStrings: 'date'
});

pool.getConnection(function (err, connection) {
	if (err) {
		console.log("Error, Connection was failed");
		console.log("sqlMessage => " + err.sqlMessage);
		console.log("errno => " + err.errno);
		console.log("code => " + err.code);
		// console.log(err);
		// console.log("Error, Connection was failed", err );
	} else console.log("Successfully connected to MySQL's db --> " + config.database); // not connected!
});

function executeQuery(strQuery, params, res, responseSenderCallback) {
	//TODO - Instead of console logging (and sometimes logging photos! To Console!!) Log to a file or db or something - based on the trade-offs involved
	//console.log("Query -> " + strQuery);
	//console.log("params -> " + params.join(','));	

	pool.getConnection(function (err, connection) {
		if (err) {
			// console.log("error -> " + err);
			res.json({ "code": 100, "status": "Error in connection database", "error": err });
			return;
		}

		connection.query(strQuery, params, function (err, rows) {
			connection.release();
			if (!err) {
				//console.log("response -> " + JSON.stringify(rows));	
				responseSenderCallback(rows, res);
			}
			else {
				// console.log("query -> " + strQuery + "; error -> " + err);
				res.json({ "error": "Something went wrong while running your request. Please contact admin." });
			}
		});
	});
}

function sendResponseNormal(rows, res) {
	res.json(rows);
}

/**************************************************************************************/
/*********                     WEB APPLICATION API CALLS              *****************/
/**************************************************************************************/

// fetching project_details
app.get('/project_details', function (req, res) {
	let projectName = config.project_name;
	let deploymentType = config.deployment_type;
	let host = config.host;
	let database = config.database;
	if (projectName)
		res.json({ "project_name": projectName, "deployment_type": deploymentType, "host": host, "database": database });
	else
		res.json({ "error": "Something went wrong. Please contact admin." });
});


// staff login related
app.post('/staff/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var params = [username, password];

	executeQuery("call sp_r_staff_login(?,?)", params, res, sendResponseNormal);
});

// fetching report masters
app.get('/master-data/report/:staffId', function (req, res) {
	var staffId = req.params.staffId;
	var params = [staffId];
	executeQuery("call sp_r_masters_get(?)", params, res, sendResponseNormal);
});

// fetching reports based on selection
app.post('/report/get-reports', function (req, res) {
	var commaseperatedIds = req.body.commaseperatedIds ? req.body.commaseperatedIds : null;
	var reportId = req.body.reportId ? req.body.reportId : null;
	var fromDate = req.body.fromDate ? new Date(req.body.fromDate) : null;
	var toDate = req.body.toDate ? new Date(req.body.toDate) : null;
	var days = req.body.days ? req.body.days : 0;
	var limitStart = req.body.limitStart ? req.body.limitStart : 0;

	var params = [commaseperatedIds, fromDate, toDate, days];

	switch (reportId) {
		case 1:
			spType = "call sp_r_registrations_get(?,?,?)"
			break;
		case 2:
			spType = "call sp_r_visits_get(?,?,?)"
			break;
		case 3:
			spType = "call sp_r_upload_pending(?)";
			params = [days];
			break;
		case 4:
			spType = "call sp_r_download_pending(?)"
			break;
		case 5:
			spType = "call sp_r_dump_data_get(?,?,?,?)";
			params = [commaseperatedIds, fromDate, toDate, limitStart];
			break;
		case 6:
			spType = "call sp_r_gender_wise_registrations_get(?,?,?)"
			break;
		case 7:
			spType = "call sp_r_screenings_get(?,?,?)"
			break;
		case 8:
			spType = "call sp_r_confirmedFor_get(?,?,?)"
			break;
		case 9:
			spType = "call sp_r_suspectedFor_get(?,?,?)"
			break;
		case 10:
			spType = "call sp_r_referrals_get(?,?,?)"
			break;
		case 11:
			spType = "call sp_r_anc_get(?,?,?)"
			break;
		case 12:
			spType = "call sp_r_minorAilment_get(?,?,?)"
			break;
		case 13:
			spType = "call sp_r_otherMinorAilment_get(?,?,?)"
			break;
		case 14:
			spType = "call sp_r_misc_get(?,?,?)"
			break;
		case 15:
			spType = "call sp_r_district_wise_count_get(?,?,?)"
			break;
	}

	executeQuery(spType, params, res, sendResponseNormal);
});


app.listen(6699, () => {
	console.log('Server is listening on port --> 6699');
});




















