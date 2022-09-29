// Debug 
console.log("Built by Mbonu Chinedum"); 

// Getting the dom elements 
let firstname = document.getElementById("firstname"); 
let lastname = document.getElementById("lastname"); 
let email = document.getElementById("email"); 
let password = document.getElementById("password"); 
let submitBtn = document.getElementById("submit-btn"); 

// Creating variables for holding the values 
let firstnameValue, lastnameValue, emailValue, passwordValue; 

// Adding event listener for the submit button 
submitBtn.addEventListener("click", (event) => {
    // Preventing the default submission 
    event.preventDefault(); 

    // Getting the user values 
    firstnameValue = firstname.value; 
    lastnameValue = lastname.value; 
    emailValue = email.value; 
    passwordValue = password.value; 

    // Checking if the values are correct 
    if ( firstnameValue && lastnameValue && emailValue && passwordValue) {
        // Converting the data into a json string 
        let data = JSON.stringify({
            "firstname": firstnameValue, 
            "lastname": lastnameValue, 
            "email": emailValue, 
            "password": passwordValue, 
        })

        // Using ajax 
        $.ajax({
            // Setting the ajax configurations 
            type: "POST", url: "/register", 
            dataType: "json", 
            contentType: "application/json", 
            data: data, 
            crossDomain: true, 
        })
        .done((data, textStatus, request) => {
            console.log(data); 

            // If the user is registered 
            if (data.status === "registered") {
                // 
                alert("User already registered!"); 
                
                // execute the block of code below 
                location.href = "/login"; 
            }
        })
        // On error 
        .catch((error) => {
            throw error; 
        })
    }

    else {
        alert("Fields Missing!")
    }
})
