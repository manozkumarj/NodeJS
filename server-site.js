/*****************************************************************/
/*****************************************************************/
/******************                          *********************/
/******************   PROJECT DIGWAL API     *********************/
/******************                          *********************/
/*****************************************************************/
/*****************************************************************/




/*************************************************************************************/
/****************** USING EXPRESS and CORS FOR MAKING THINGS SIMPLER **************************/
/*************************************************************************************/
/*eslint-disable no-unused-params */
var express = require('express');
var app = express();

app.use(express.static('../frontend/dist'));

app.listen(3033);




















