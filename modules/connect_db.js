// Importing the necessary modules 
const mysql = require('mysql'); 

// Creating a class for connection 
class ConnectDB {
    constructor() {
        // Pass 
    }

    // Creating a method for connecting into the 
    // database 
    connect() {
        // Connecting to the database 
        let conn = mysql.createConnection({
            host: "localhost", 
            user: "root", 
            password: "password", 
            database: "mydb", 
        }); 

        // Returning the connection 
        return conn; 
    }
}


// Exporting the module 
module.exports.ConnectDB = ConnectDB; 