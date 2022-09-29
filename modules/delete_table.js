// Importing the necessary modules 
const mysql = require('mysql'); 

// Making the connection 
let conn = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "password", 
    database: "mydb", 
}); 

// Removing the table 
conn.connect((error) => {
    if (error) throw error; 

    // Setting the sql statement 
    let sql = `DROP TABLE chats`; 

    // Making the query 
    conn.query(sql, (error, result) => {
        if (error) throw error; 
        console.log("Table Deleted"); 
    })
}) 