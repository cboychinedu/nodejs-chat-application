// Importing the necessary modules 
const path = require("path"); 
const express = require("express"); 
const http = require("http"); 
const app = express(); 
const server = http.createServer(app); 
const io = require("socket.io")(server, { cors: {origin: "*"}}) 

// Setting the base path 
let base_path = path.join(__dirname); 

// Exporting the base path 
module.exports.base_path = base_path; 
module.exports.io = io; 