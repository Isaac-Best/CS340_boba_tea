// Function to delete an inventory item
function deleteInventory(inventory_id) {
    // Put our data we want to send in a javascript object
    let data = {
        inventory_id: inventory_id
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-inventory", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Delete the row from the table
            deleteRow(inventory_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

// Function to delete a row from the inventory table
function deleteRow(inventory_id){
    let table = document.getElementById("inventory");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        // Rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == inventory_id) {
            table.deleteRow(i);
            break;
        }
    }
}