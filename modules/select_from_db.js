// Importing the necessary modules 
const mysql = require("mysql"); 

// Creating a connection 
let conn = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "password", 
    database: "mydb", 
}); 

// connecting into the database 
conn.connect((error) => {
    if (error) throw error; 

    // setting the sql statement 
    conn.query("SELECT * FROM users", (error, result, fields) => {
        if (error) throw error; 

        // else 
        else {
            console.log(result); 
        }
    })
})