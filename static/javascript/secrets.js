// Debug 
console.dir("This script was created by Mbonu Chinedum"); 

// Getting the elements 
let socket; 
let userId 
let ul = document.getElementById("messages"); 
let chatMessage = document.getElementById("message"); 
let submitBtn = document.getElementById("submit-btn-image"); 

// Using ajax 
$.ajax({
    // Setting the ajax configuration 
    type: "POST", url: "/secrets-chats", 
    dataType: "json", contentType: "application/json", 
    crossDomain: true, 
})
.done((dataValue, textStatus, request) => {
    // Getting the chats 
    console.log(dataValue); 

    // Looping through the array 
    dataValue.forEach(element => {
        let fullname = element.fullname; 
        let messageValue = element.message; 

        // Creating a list 
        li = document.createElement("li"); 
        li.className = "user-one"; 

        // Adding information 
        li.innerHTML = `
            Username: <span class="user-name-tag"> ${fullname} </span> <br> 
            <span class="messages-span"> ${messageValue} </span> 
        `; 

        // Appending 
        ul.appendChild(li); 
    }); 
})

// Connecting to the socket server 
socket = io('http://localhost:3001'); 
socket.on('secrets', (data) => {
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

    // Appending 
    ul.appendChild(li); 
})

// Adding event listener for the submit button 
submitBtn.addEventListener("click", (event) => {
    // Preventing the defulat action 
    event.preventDefault(); 

    // Getting the typed message 
    let message = chatMessage.value; 
    let data = JSON.stringify({
        "message": message
    })

    // Getting the user id using ajax 
    $.ajax({
        // Setting the ajax configuration 
        type: "POST", url: "/secrets", 
        dataType: "json", contentType: "application/json", 
        data: data, crossDomain: true, 
    })
    .done((dataValue, textStatus, request) => {
        // Getting the user data 
        full_name = dataValue["fullname"]; 

        // Saving the data as a json object 
        let data = JSON.stringify(
            {
                "userMessage": message, 
                "full_name": full_name, 
            }
        ); 

        // Creating a socket object 
        socket = io('http://localhost:3001'); 

        // Sending the message 
        socket.emit("secrets", data); 
        chatMessage.value = ""; 
    })
})