// Importing the necessary modules 
const fs = require("fs"); 
const { ConnectDB } = require("./modules/connect_db"); 
const express = require("express"); 
const path = require("path"); 
const chalk = require("chalk"); 
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session); 
const bodyParser = require("body-parser"); 
const morgan = require("morgan"); 
const http = require('http');  
const mysql = require('mysql'); 
const app = express(); 
const fileupload = require('express-fileupload');
const cookieParser = require("cookie-parser"); 
const server = http.createServer(app)
const io = require("socket.io")(server, { cors: {origin: "*"}}) 

// Setting the options 
const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'mydb',
}; 


// storing the sessions 
const sessionStore = new mysqlStore(options); 

// Using the session 
app.use(session({
    key: '69Atu22GZTSyDGW4sf4mMJdJ42436gAs',
    secret: '3dCE84rey8R8pHKrVRedgyEjhrqGT5Hz',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
})); 

// Using some necessary middleware function 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(express.json());
app.use(fileupload())
app.use(express.static('static'));
app.use(express.static('./static/javascript'));
app.use(express.static('./static/templates'));
app.use(express.static('./static/images')); 
app.use(express.static('./static/css'));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Setting the views 
app.set('view engine', 'ejs'); 
app.set('views', './views')

// Setting the host, and port 
const PORT = process.env.PORT || 3001; 
const HOST = process.env.HOST || "localhost"; 

// Importing the router 
const home = require("./routes/routes"); 
const { connect } = require("http2");
const MySQLStore = require("express-mysql-session");

// Setting the routes 
app.use("/", home) 

// Creating a connection 
io.on('connection', (socket) => {
    // Broadcasting the intelligence message 
    socket.on("intelligence", (data) => {
        socket.broadcast.emit("intelligence", data)
    })

    // Broadcasting the secrets message 
    socket.on("secrets", (data) => {
        socket.broadcast.emit("secrets", data)
    })

    // Broadcasting the music message 
    socket.on("music", (data) => {
        socket.broadcast.emit("music", data) 
    })
}); 

// Running the server 
server.listen(PORT, HOST, () => {
    // running the server 
    let serverMessage = chalk.magenta(`The server is running on: ${HOST + ":" + PORT}`); 
    console.log(serverMessage); 
}); 


