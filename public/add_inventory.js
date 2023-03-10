// Get the objects we need to modify
let addInventoryForm = document.getElementById('add-inventory-form');


// Modify the objects we need
addInventoryForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStoreID = document.getElementById("input-storeID");
    let inputMilkAmount = document.getElementById("input-milk");
    let inputTeaAmount = document.getElementById("input-tea");
    let inputBobaAmount = document.getElementById("input-boba");

    // Get the values from the form fields
    let storeIDValue = inputStoreID.value;
    let milkAmountValue = inputMilkAmount.value;
    let teaAmountValue = inputTeaAmount.value;
    let bobaAmountValue = inputBobaAmount.value;

    // Put our data we want to send in a javascript object
    let data = {
        storeID: storeIDValue,
        milkAmount: milkAmountValue,
        teaAmount: teaAmountValue,
        bobaAmount: bobaAmountValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-inventory-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputStoreID.value = '';
            inputMilkAmount.value = '';
            inputTeaAmount.value = '';
            inputBobaAmount.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from inventory
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("inventory");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    console.log(parsedData)

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let inventoryIDCell = document.createElement("TD");
    let storeIDCell = document.createElement("TD");
    let milkAmountCell = document.createElement("TD");
    let teaAmountCell = document.createElement("TD");
    let bobaAmountCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    row.setAttribute("data-value", newRow.inventory_id);
    inventoryIDCell.innerText = newRow.inventory_id;
    storeIDCell.innerText = newRow.store_id;
    milkAmountCell.innerText = newRow.milk_amount;
    teaAmountCell.innerText = newRow.tea_amount;
    bobaAmountCell.innerText = newRow.boba_amount;
    locationCell.innerText = newRow.store_location;
    deleteCell.innerHTML = `<button onclick="deleteInventory(${newRow.inventory_id})">Delete</button>`;

    // Add the cells to the row
    row.appendChild(inventoryIDCell);
    row.appendChild(storeIDCell);
    row.appendChild(milkAmountCell);
    row.appendChild(teaAmountCell);
    row.appendChild(bobaAmountCell);
    row.appendChild(locationCell);
    row.appendChild(deleteCell);

    // Add the row to the table
    currentTable.appendChild(row);
}
