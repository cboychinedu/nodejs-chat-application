// Creating a function for validating the procted route 
const protectedRoute = (req, res, next) => {
    // Getting the value for the user's authentication 
    try {
        let isAuth = req.session.isAuth; 

        // Checking if the user is a valid user 
        if (isAuth) {
            // Move on to the next middleware 
            next(); 
        }

        // if the user is not authenticated 
        else {
            // Redirect the user back to the login page 
            return res.redirect('/'); 
        }
    }

    // Using try and catch block 
    catch (error) {
        // Redirect the user back to the login page 
        return res.redirect('/'); 
    }
}

// Exporting the auth module 
module.exports.protectedRoute = protectedRoute; 
