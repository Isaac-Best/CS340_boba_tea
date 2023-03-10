// Get the objects we need to modify
let addEmployeeForm = document.getElementById('add-store-form');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputLocation = document.getElementById("input-location"); 
    let inputFranchisee = document.getElementById("input-franchisee");

    // Get the values from the form fields
    let locationValue = inputLocation.value;
    let franchiseeValue = inputFranchisee.value;

    // Put our data we want to send in a javascript object
    let data = {
        location: locationValue,
        franchisee: franchiseeValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-store-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputLocation.value = '';
            inputFranchisee.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from 
// stores
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("stores");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let storeIDCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let franchiseeCell = document.createElement("TD"); 
    let deleteCell = document.createElement("TD"); 

    // Fill the cells with correct data
    row.setAttribute("data-value", newRow.store_id);
    storeIDCell.innerText = newRow.store_id;
    locationCell.innerText = newRow.location;
    franchiseeCell.innerText = newRow.franchisee;
    deleteCell.innerHTML = `<button onclick="deleteStore(${newRow.store_id})">Delete</button>`;

    // Attach the cells to the row
    row.appendChild(storeIDCell);
    row.appendChild(locationCell);
    row.appendChild(franchiseeCell);
    row.appendChild(deleteCell);

    // Attach the row to the table
    currentTable.appendChild(row);
}
