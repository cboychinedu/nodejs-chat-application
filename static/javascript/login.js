// Debug 
console.dir("This script was built by Mbonu Chinedum"); 

// Getting the dom elements for the input tags 
const email = document.getElementById("email"); 
const password = document.getElementById("password"); 
const submitBtn = document.getElementById("submit-btn");

// Declaring some necessary variables for password and email 
let passwordValue, emailValue; 

// Adding event listener for the submit button 
submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    // Get the user input value 
    passwordValue = password.value; 
    emailValue = email.value; 

    // Checking 
    if (passwordValue && emailValue) {
        // converting the data into a json string 
        let data = JSON.stringify({
            "email": emailValue, 
            "password": passwordValue, 
        })

        // Using ajax 
        $.ajax({
            // settting the ajax configurations 
            type: "POST", url: "/login", 
            dataType: "json", 
            contentType: "application/json", 
            data: data, 
            crossDomain: true, 
        })
        .done((data, textStatus, request) => {
            console.log(data); 

            // Checking 
            if (data.message === "logged_in") {
                location.href = "/home"
            }
        })
        .catch((error) => {
            console.log(error); 
        })
        
    }

    else {
        alert("Fields Missing!"); 
    }


})