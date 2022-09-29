// Importing the necessary modules 
const md5 = require("md5"); 

// Declaring the password 
let password = "123456";

// Hashing the password 
let hashed_password = md5(password); 

// Displaying the hash 
console.log(hashed_password); 