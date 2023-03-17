
// Code for deleteMenuItem using regular javascript/xhttp
function deleteMenuItem(menu_item_id) {
    // Put our data we want to send in a javascript object
    let data = {
        menu_item_id: menu_item_id
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-menuItem", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the row from the table
            deleteRow(menu_item_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

// Function to delete the row from the menu item table
function deleteRow(menu_item_id) {
    let table = document.getElementById("menu-items");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        // Rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == menu_item_id) {
            table.deleteRow(i);
            break;
        }
    }
}
