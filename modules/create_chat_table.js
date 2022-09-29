// Importing the necessary modules 
const mysql = require("mysql"); 

// Creating a connection 
let conn = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "password", 
    database: "mydb", 
}); 

// Creating a table 
conn.connect((error) => {
    if (error) throw error; 
    console.log("Connected"); 

    // Creating an sql statement 
    let sql = `CREATE TABLE secrets (
        fullname VARCHAR(255),   
        message VARCHAR(255)
    )`; 

    // Performing the query 
    conn.query(sql, (error, result) => {
        if (error) throw error; 
        console.log('Table Created'); 
    })
})

// Three tables should be created 
// intelligence 
// music 
// secrets