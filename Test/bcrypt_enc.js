// Importing the necessary modules 
const bcrypt = require("bcrypt"); 
const saltRounds = 10; 

// setting the password 
let password = "12345667"; 

// Hashing 
const hash = bcrypt.hashSync(password, saltRounds); 


// Comparing password 
const condition = bcrypt.compareSync("12345667", hash); 
console.log(condition); 