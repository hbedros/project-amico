const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path');
const htmlRoutes = require('./app/routes/htmlRoutes.js');
const apiRoutes = require('./app/routes/apiRoutes.js');
const publicDirectory = './app/public/';
const expressHandlerbars = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const morgan = require('morgan');


createServer = ()=>{
	const Server = {
		port : undefined,
		app : undefined,
	}

	Server.app = express();
	Server.app.use(express.static(publicDirectory));
	Server.app.use(bodyParser.urlencoded({ extended: true }));
	Server.app.use(bodyParser.json());
	Server.app.use(expressFileUpload());
	Server.app.use(cookieParser());
	Server.app.engine("handlebars", expressHandlerbars({ defaultLayout: "main" }));
	Server.app.set("view engine", "handlebars");
	Server.app.use(morgan('dev'));
	Server.app.use(htmlRoutes);
	Server.app.use(apiRoutes);


	return Server;

}


const Server = createServer();
Server.port = 8080;

Server.app.listen(process.env.PORT || Server.port);

