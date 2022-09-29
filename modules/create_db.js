// importing the necessary modules 
const mysql = require('mysql'); 

// creating a connection 
let conn = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "password", 
}); 

// Connecting to the database 
conn.connect((error) => {
    if (error) throw error; 
    console.log("Connected!"); 
    
    // Creating the database 
    conn.query("CREATE DATABASE mydb", (error, result) => {
        if (error) throw error; 
        console.log("Database Created!"); 
    })
})