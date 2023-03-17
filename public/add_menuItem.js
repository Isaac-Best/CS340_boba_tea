// Get the objects we need to modify
let addMenuItemForm = document.getElementById('add-menuItem-form');

// Modify the objects we need
addMenuItemForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get form fields we need to get data from
    let inputInventoryID = document.getElementById("input-inventory-id"); 
    let inputItemName = document.getElementById("input-item-name");
    let inputItemCost = document.getElementById("input-item-cost");

    // Get the values from the form fields
    let inventoryIDValue = inputInventoryID.value;
    let itemNameValue = inputItemName.value;
    let itemCostValue = inputItemCost.value;

    // Put our data we want to send in a javascript object
    let data = {
        inventory_id: inventoryIDValue,
        item_name: itemNameValue,
        item_cost: itemCostValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-menuItem-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputInventoryID.value = '';
            inputItemName.value = '';
            inputItemCost.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input ON LINE 60.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


// Creates a single row from an Object representing a single record from
// menu items
addRowToTable = (data) => {
    
    let currentTable = document.getElementById("menu-items");
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let menuItemIDCell = document.createElement("TD");
    let inventoryIDCell = document.createElement("TD");
    let itemNameCell = document.createElement("TD");
    let itemCostCell = document.createElement("TD");
    let deleteCell = document.createElement("TD"); 

    // Fill the cells with correct data
    row.setAttribute("data-value", newRow.menu_item_id);
    menuItemIDCell.innerText = newRow.menu_item_id;
    inventoryIDCell.innerText = newRow.inventory_id;
    itemNameCell.innerText = newRow.item_name;
    itemCostCell.innerText = newRow.item_cost;
    deleteCell.innerHTML = '<button onclick="deleteMenuItem(' + newRow.menu_item_id + ')">Delete</button>';

    // Add the cells to the row 
    row.appendChild(menuItemIDCell);
    row.appendChild(inventoryIDCell);
    row.appendChild(itemCostCell);
    row.appendChild(itemNameCell);
    row.appendChild(deleteCell);

    // Add the row to the table
    currentTable.appendChild(row);
}; 
