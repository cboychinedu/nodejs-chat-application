// Debug 
console.log("This script was created by Mbonu Chinedum"); 

// Getting the dom elements 
let socket; 
let userId; 
let ul = document.getElementById("messages"); 
let chatMessage = document.getElementById("message"); 
let submitBtn = document.getElementById("submit-btn-image"); 

// Using ajax 
$.ajax({
    // Setting the ajax configuration 
    type: "POST", url: "/music-chats", 
    dataType: "json", contentType: "application/json", 
    crossDomain: true, 
})
.done((dataValue, textStatus, request) => {
    // Looping 
    dataValue.forEach(element => {
        let fullName = element.fullname; 
        let messageValue = element.message; 

        // Creating a list 
        li = document.createElement("li"); 
        li.className = "user-one"; 

        // Adding information 
        li.innerHTML = `
            Username: <span class="user-name-tag"> ${fullName} </span> <br> 
            <span class="messages-span"> ${messageValue} </span> 
        `; 

        // Appending the list item 
        ul.appendChild(li); 
    })

})

// Connecting to the socket server 
socket = io('http://localhost:3001'); 
socket.on("music", (data) => {
    // Parsing the data 
    data = JSON.parse(data); 

    // Getting the username and the message 
    let username = data["full_name"]; 
    let message = data["userMessage"]; 

    // Creating the list 
    li = document.createElement("li"); 
    li.className = "user-one"; 

    // Making the chat body 
    li.innerHTML = ` 
        Username: <span class="user-name-tag"> ${username} </span> <br> 
        <span class="messages-span"> ${message} </span> 
    `; 

    // Appending the list 
    ul.appendChild(li); 
})

// Adding event listener for the submit button 
submitBtn.addEventListener("click", (event) => {
    // Preventing the default action 
    event.preventDefault(); 

    // Getting the typed message 
    let message = chatMessage.value; 

    // Getting the user id by using ajax 
    $.ajax({
        // Setting the ajax configuration 
        type: "POST", url: "/music", 
        dataType: "json", contentType: "application/json", 
        data: JSON.stringify({
            "message": message
        }), 
        crossDomain: true, 
    })
    // On success 
    .done((dataValue, textStatus, request) => {
        // Getting the user data 
        full_name = dataValue["fullname"]; 

        // Saving the data as a json object 
        let data = JSON.stringify({
            "userMessage": message, 
            "full_name": full_name, 
        }); 

        // Creating a socket object 
        socket = io("http://localhost:3001"); 

        // Sending the message 
        socket.emit("music", data); 
        chatMessage.value = ""; 
    })
})