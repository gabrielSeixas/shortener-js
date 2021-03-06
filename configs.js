// Application main start
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./app/routes');
const app = express();

module.exports = function (env = 'dev') {
	process.env.NODE_ENV = env;

	mongoose.connect('mongodb://shortenerjs_db_1:shortener/shortener_' + env);

	app.use(morgan('combined'));
	app.use(bodyParser.json());
	app.use(cors());
	router(app);

	let port = 0;

	if (process.env.NODE_ENV == 'test') {
		port = 9090;
	} else if (process.env.NODE_ENV == 'dev') {
		port = 8888;
	}
	
	const server = http.createServer(app);
	server.listen(port);
	console.log('Server running on port: ' + port);

	return app;
};