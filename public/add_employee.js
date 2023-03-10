
// Get the objects we need to modify
let addEmployeeForm = document.getElementById('add-employee-form');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name"); 
    let inputBirthdate = document.getElementById("input-birthdate");
    let inputAddress = document.getElementById("input-address");
    let inputPhoneNumber = document.getElementById("input-PhoneNumber");
    let inputStoreID = document.getElementById("input-storeID")



    // Get the values from the form fields
    let nameValue = inputName.value;
    let birthdateValue = inputBirthdate.value;
    let addressValue = inputAddress.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let storeIDValue = inputStoreID.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        birthdate: birthdateValue,
        address: addressValue,
        phoneNumber: phoneNumberValue,
        storeID: storeIDValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputBirthdate.value = '';
            inputAddress.value = '';
            inputPhoneNumber.value = '';
            inputStoreID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input ON LINE 60.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// employees
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("employees");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let employeeIDCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let birthdateCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");
    let storeIDCell = document.createElement("TD");
    let storeLocationCell = document.createElement("TD"); 
    let deleteCell = document.createElement("TD"); 

    // Fill the cells with correct data
    row.setAttribute("data-value", newRow.employee_id);
    employeeIDCell.innerText = newRow.employee_id;
    nameCell.innerText = newRow.name;
    birthdateCell.innerText = newRow.birthdate;
    addressCell.innerText = newRow.address;
    phoneNumberCell.innerText = newRow.phone_number;
    storeIDCell.innerText = newRow.store_id;
    storeLocationCell.innerText = newRow.store_location; 
    deleteCell.innerHTML = '<button onclick="deleteEmployee(' + newRow.employee_id + ')">Delete</button>';

    // Add the cells to the row 
    row.appendChild(employeeIDCell);
    row.appendChild(nameCell);
    row.appendChild(birthdateCell);
    row.appendChild(addressCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(storeIDCell);
    row.appendChild(storeLocationCell);
    row.appendChild(deleteCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
