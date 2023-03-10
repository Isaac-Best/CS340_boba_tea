


// code for deleteStore using regular javascript/xhttp
function deleteStore(store_id) {
    // Put our data we want to send in a javascript object
    let data = {
        store_id: store_id
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-store", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(store_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(store_id){

    let table = document.getElementById("stores");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop


        // console.log(table.rows[i].getAttribute("data-value"));
        // console.log(store_id, 'this is the store id')

       if (table.rows[i].getAttribute("data-value") == store_id) {
            table.deleteRow(i);
            break;
       }
    }
}
