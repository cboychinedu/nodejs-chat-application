// Creating a variable called myVar
let myVar;

// Creating a function to show the
// loading screen for 3seconds only
function myFunction() {
  // myVar = setTimeout(showPage, 5000);
  document.getElementById("loader").style.display = "block";
  myVar = setTimeout(hidePage, 4000);
}

// Creating a functon for hiding the page
function hidePage() {
    document.getElementById("loader").style.display = "none";
    modal.style.display = "none";
    modal_content.style.display = "none";
}

// Getting the necessary dom elements
// Get the modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
let modal_content = document.getElementById("modal-content");
var span = document.getElementsByClassName("close")[0];
let search_input = document.getElementById("search-value");
let search_btn = document.getElementById("search-btn");
let searchValue;

// Getting the dom elements for the chat sections
let intelligence = document.getElementById("intelligence");
let music = document.getElementById("music");
let secrets = document.getElementById("secrets");

// Adding event listener for the intelligence button
intelligence.addEventListener("click", (event) => {
    // Redirecting the user to the intelligence route
    location.href = "/intelligence";
});

// Adding event listener for the music button
music.addEventListener("click", (event) => {
    // Redirecting the user to the music route 
    location.href = "/music"; 
});

// Adding event listener for the secrets button
secrets.addEventListener("click", (even) => {
    // Redirect the user to the secrets route
    location.href = "/secrets"; 
});

// When the user clicks the button, open the modal
search_btn.onclick = function() {
    modal.style.display = "block";
    modal_content.style.display = "block";
}

// Adding event listener to the search button
search_btn.addEventListener("click", (event) => {
    // Prevent default submission
    event.preventDefault();

    // Get the search value
    searchValue = search_input.value;

    // Getting the table tag
    let table = document.getElementById("display-table");

    // loader
    myFunction();

    // Converting the search value into a json data object
    let data = JSON.stringify({"searched_value": searchValue })

    // // making a connectiong to the server
    // $.ajax({
    //     // Setting the ajax configurations
    //     type: "POST",
    //     url: "/search",
    //     dataType: "json",
    //     contentType: "application/json",
    //     data: data,
    //     crossDomain: true,
    // })
    // .done((data, textStatus, request) => {

    //     // Logging the data
    //     data = data["data"];

    //     table.innerHTML = "";

    //     // Looping through the data
    //     data.forEach((element, index) => {
    //         console.log(element);

    //         // Building the html table
    //         let tr = document.createElement("tr");

    //         // Adding element into the table row
    //         tr.innerHTML = `
    //             <td class="table-data">
    //                 ${element["firstname"]}
    //             </td>
    //             <td class="table-data">
    //                 ${element["lastname"]}
    //             </td>
    //             <td class="table-data-message">
    //                 <input type="button" value="Message" class="message-btn" id="message-btn">
    //             </td>
    //         `;

    //         // Appending the row
    //         table.appendChild(tr);

    //         //
    //         let button = document.getElementById("message-btn");

    //         // Adding event listener for each button
    //         button.addEventListener("click", (event) => {
    //             // Hit the /chat route and assign this user a session id of One
    //             location.href = "/chat"
    //         })






    //     });
    // })
    // .catch((error) => {
    //     console.log(error);
    // })

})
