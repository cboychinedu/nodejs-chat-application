// importing the necessary modules 
const mysql = require('mysql'); 

// creating a connection 
let conn = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "password", 
    database: "mydb", 
}); 

// creating a table 
conn.connect((error) => {
    if (error) throw error; 
    console.log('Connected!'); 

    // Creating an sql statement 
    let sql = `CREATE TABLE users (
        firstname VARCHAR(255),
        lastname VARCHAR(255),  
        email_address VARCHAR(255),
        password VARCHAR(255))`; 

    // perfoming a query 
    conn.query(sql, (error, result) => {
        if (error) throw error; 
        console.log("Table Created"); 
    })
})