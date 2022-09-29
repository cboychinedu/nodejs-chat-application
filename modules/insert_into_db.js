// imporitng the necessary modules 
const mysql = require('mysql'); 

// creating the connection 
const conn = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "password", 
    database: "mydb", 
}); 

// creating a connection to the database 
conn.connect((error) => {
    // checking if there
    if (error) throw error; 
    console.log("Connected"); 

    // setting the sql statement 
    let sql = `
        INSERT INTO users (firstname, lastname, email_address, password) 
        VALUES ('mbonu', 'chinedum', 'cboy.chinedu@gmail.com', '12345')`; 

    // Making the connection 
    conn.query(sql, (error, result) => {
        // if error 
        if (error) throw error; 

        // else 
        else {
            console.log("1 record inserted"); 
        }
    })
})