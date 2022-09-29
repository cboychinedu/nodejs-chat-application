// Importing the necessary modules 
const express = require("express"); 
const session = require("express-session"); 
const path = require("path"); 
const { ConnectDB } = require("../modules/connect_db"); 
let bodyParser = require("body-parser"); 
const bcrypt = require('bcrypt'); 
const { protectedRoute } = require('../auth/auth'); 
const { base_path, io } = require("../base.js"); 

// creating the router object 
const router = express.Router(); 
router.use(express.json()); 
 
// creating the session variales 
let sess; 

// Creating the session for the chat 
let chat_session; 

// create the application/x-www form 
let urlencodedParser = bodyParser.urlencoded({ extended: false }); 

// Setting the home page 
router.get("/", async(req, res) => {
    // setting the home page 
    let full_path = path.join(base_path, 'static', 'templates', 'home.ejs'); 
    return res.render(full_path); 
})

// Creating the sign in route "GET"
router.get("/register", async(req, res) => {
    // Using the try catch block 
    try {
        // Getting the session data 
        let isAuth = req.session.isAuth; 

        // Checking if the user is a valid user 
        if (isAuth) {
            return res.redirect("/home"); 

        }

        else {
            // Redirect the user back to the home page 
            let full_path = path.join(base_path, 'static', 'templates', 'register.ejs'); 
            return res.render(full_path); 
        }
    }

    // Catch block 
    catch (error) {
        // On error, redirect the user to the register roue 
        // Redirect the user back to the home page 
        let full_path = path.join(base_path, 'static', 'templates', 'register.ejs'); 
        return res.render(full_path); 

    } 
})

// Creating the sign in route "POST" 
router.post("/register", async(req, res) => {
    // Getting the user data 
    let email_address = req.body.email; 
    let firstname = req.body.firstname; 
    let lastname = req.body.lastname; 
    let password = req.body.password; 
    let data; 
    let saltRounds = 10; 

    // Making the connection 
    let connection = new ConnectDB(); 
    let conn = connection.connect(); 

    // connecting into the database 
    conn.connect( (error) => {
        if (error) throw error; 

        // Setting the sql statement 
        let sql_statement = `SELECT * FROM users WHERE email_address='${email_address}';`;
        conn.query(sql_statement, (error, result, fields) => {
            // If there is an error 
            if (error) throw error; 

            // else if 
            else if (result.length >= 1) { 
                return res.send({
                    "status": "registered", 
                    "message": "The User is already registered on the database", 
                })

            }

            // else 
            else {
                // Convert the password into a hash value 
                let hash = bcrypt.hashSync(password, saltRounds); 

                // Register the user 
                // Creating the sql statement 
                let sql = `
                    INSERT INTO users (firstname, lastname, email_address, password)
                    VALUES ('${firstname}', '${lastname}', '${email_address}', '${hash}')
                `; 

                // Making the connection 
                conn.query(sql, (error, result) => {
                    // if error 
                    if (error) throw error; 

                    // else 
                    return res.send({
                        "status": "registration_complete", 
                        "message": "Registration complete"
                    })
                })
            }
        })
    })
    

    
    
})


// Creating the login route "GET"
router.get("/login", async(req, res) => {
    // Checking if the user is already logged in 
    try {
        // Getting the sessions data; 
        let isAuth = req.session.isAuth; 

        // If the user is authenticated 
        if (isAuth) {
            return res.redirect("/home"); 
        }

        else {
            let full_path = path.join(base_path, 'static', 'templates', 'login.ejs'); 
            return res.render(full_path); 
        }
    }

    // Using a try and catch block 
    catch (error) {
        // Sending login page 
        let full_path = path.join(base_path, 'static', 'templates', 'login.ejs'); 
        return res.render(full_path); 
    }
    
})


// Creating the login route "POST" 
router.post("/login", async(req, res) => {
    // Getting the user data 
    let email_address = req.body.email; 
    let password = req.body.password; 

    // Making the connection 
    let connection = new ConnectDB(); 
    let conn = connection.connect(); 

    // Getting the password for the user 
    // Setting the sql statement 
    let sql_statement = `SELECT * FROM users WHERE email_address='${email_address}';`;
    conn.query(sql_statement, async (error, result, fields) => {
        // If there is an error 
        if (error) throw error; 

        // else if 
        else if (result.length >= 1 ) {
            let password_condition = bcrypt.compareSync(password, result[0].password); 

            // If the condition is true 
            if (password_condition) {


                // Creating a user session object and place it into the request header 
                sess = req.session; 
                sess.email = req.body.email; 
                sess.isAuth = true; 
                sess.full_name = `${result[0]['firstname']} ${result[0]['lastname']}`;

                console.log(req.session); 

                // Send back the logged in message 
                let successMsg = JSON.stringify({
                    "message": "logged_in"
                }); 

                // send the message 
                return res.send(successMsg).status(200); 
            }

            // else 
            else {
                let failureMsg = JSON.stringify({
                    "message": "error"
                }); 

                // sending the message 
                return res.send(failureMsg).status(200); 
            }


        }

        else {
            return res.send({
                "message": "not_logged_in"
            })
        }
    })
    
})

// User's home 
router.get("/home", protectedRoute, async(req, res) => {
    // sending the home page for the logged in user 
    let full_path = path.join(base_path, 'static', 'templates', 'userHome.ejs')
    return res.render(full_path); 
})

// Creating a route for music
router.get("/music", protectedRoute, async(req, res) => {
    // Sending the home page for the music route 
    let full_path = path.join(base_path, 'static', 'templates', 'music.ejs'); 
    return res.render(full_path); 
}); 

// Creating a post route for storing the secrets message 
router.post("/music", protectedRoute, async(req, res) => {
    // Getting the user ful name 
    let full_name = req.session.full_name; 
    let message = req.body.message; 

    // Saving the data to the music database for future retrival 
    let connect = new ConnectDB(); 
    let conn = connect.connect(); 

    // Creating an sql statement to save the chat conversations 
    let sql_statement = `
        INSERT INTO music (fullname, message) 
        VALUES ('${full_name}',  '${message}')
    `; 

    // Making the connection 
    conn.query(sql_statement, (error, result) => {
        // If there is an error 
        if (error) throw error; 

        // Else if 
        else {
            // Sending back the user's full name 
            data = JSON.stringify({
                "fullname": full_name
            })

            // Sending back the user full name 
            return res.send(data); 
        }
    })
})
// Creating a route for getting the music chats 
router.post("/music-chats", protectedRoute, async (req, res) => {
    // Connecting into the database 
    let connect = new ConnectDB(); 
    let conn = connect.connect(); 

    // Creating an sql statement to extract the music chats from the 
    // database 
    let sql_statement = `
        SELECT * FROM music
    `; 

    // Making the connection 
    conn.query(sql_statement, (error, result) => {
        // If there is an error 
        if (error) throw error; 

        // Else 
        else {
            // Sending the result 
            return res.send(result); 
        }
    })
})



// Creating a route for secrets
router.get("/secrets", protectedRoute, async (req, res) => {
    // Sending the home page for the secrets route 
    let full_path = path.join(base_path, 'static', 'templates', 'secrets.ejs')
    return res.render(full_path); 
}); 

// Creating a post route for storing the secrets message 
router.post("/secrets", protectedRoute, async(req, res) => {
    // Getting the user full name 
    let full_name = req.session.full_name; 
    let message = req.body.message; 

    // Saving the data to the intelligence database for future retrival 
    let connect = new ConnectDB(); 
    let conn = connect.connect(); 

    // Creating an sql statement to save the chat conversations 
    let sql_statement = `
        INSERT INTO secrets (fullname, message) 
        VALUES ('${full_name}', '${message}')
    `; 

    // Making the connection 
    conn.query(sql_statement, (error, result) => {
        // If there is an error 
        if (error) throw error; 

        // Else if 
        else {
            // Sending back the user's full name 
            data = JSON.stringify({
                "fullname": full_name 
            })

            // Sending back the user full name 
            return res.send(data); 
        }
    })
})

// Creating a route for getting the secrets chats 
router.post("/secrets-chats", protectedRoute, async (req, res) => {
    // Connecting into the database 
    let connect = new ConnectDB(); 
    let conn = connect.connect(); 

    // Creating an sql statement to extract the secrets chats from the 
    // database 
    let sql_statement = `
        SELECT * FROM secrets
    `; 

    // Making the connection 
    conn.query(sql_statement, (error, result) => {
        // If there is an error  
        if (error) throw error; 

        // Else 
        else {
            // Sending the result 
            return res.send(result); 
        }
    })
})

// Creating a route for the intelligence chatting
router.get("/intelligence", protectedRoute, async (req, res) => {

    // Sending the home page for the intelligence route 
    let full_path = path.join(base_path, 'static', 'templates', 'intelligence.ejs'); 
    return res.render(full_path); 
}); 

// Creating a route for getting the intelligence chats 
router.post("/intelligence-chats",  protectedRoute, async (req, res) => {
    // Connecting into the database 
    let connect = new ConnectDB(); 
    let conn = connect.connect(); 

    // Creating an sql statement extract the chats from the database 
    let sql_statement = ` 
        SELECT * FROM intelligence
    `; 

    // Making the connection 
    conn.query(sql_statement, (error, result) => {
        // If there is an error 
        if (error) throw error; 

        // Else 
        else {
            // Sending 
            return res.send(result); 
        }
    })
})
// Creating post route for storing the message 
router.post("/intelligence", protectedRoute, async (req, res) => {
    // Getting the user full name 
    let full_name = req.session.full_name;
    let message = req.body.message; 
     

    // Saving the data to the intelligence database for future retrival 
    let connect = new ConnectDB(); 
    let conn = connect.connect();
    
    // Creating an sql statement to save the chat conversations 
    let sql_statement = `
        INSERT INTO intelligence (fullname, message)
        VALUES ('${full_name}', '${message}')
    `; 

    // Making the connection 
    conn.query(sql_statement, (error, result) => {
        // If there is an error 
        if (error) throw error; 

        else {
            // Sending back the user's full name 
            data = JSON.stringify({
                "fullname": full_name
            })

            // sending back the user full name 
            return res.send(data); 
        }
    })
    
    
})



// Search route 
router.post("/search", protectedRoute, async(req, res) => {
    // Getting the search query 
    let search_value = req.body.searched_value; 

     // Making the connection 
     let connection = new ConnectDB(); 
     let conn = connection.connect(); 

     // Connecting into the database 
     conn.connect((error) => {
         // If there is an error 
         if (error) throw error; 

         // Setting the sql statement 
         let sql = `SELECT firstname, lastname, email_address FROM users WHERE firstname = '${search_value}'`; 
         conn.query(sql, (error, result, fields) => {
             // Converting the data into a json data 
             data = JSON.stringify({
                "data": result
            }); 

             if (error) throw error; 

             // Else 
             else if (result.length >= 1) {
                 return res.send(data); 

             }

             else {
                 return res.send(data); 
             }
         })
     })

})


// Settting the signout route
router.get('/logout', async(req, res) =>
{
  // Destroying the users sessions
  req.session.destroy((error) => {
    if (error)
    {
       // Throw an error on failure to remove the session cookie
       throw error;

       //--logging the error
       errorLogger(error);

       // Redirect the user to the home route "/"
       return res.redirect('/');
    }

    // On removal of the session cookie data, redirect the user to the home route.
    else {
      // Assign the session value of null type
      req.session = null;

      // Redirect the user to the home page route
      return res.redirect('/'); }
  });

});


// Exporing the router 
module.exports = router; 