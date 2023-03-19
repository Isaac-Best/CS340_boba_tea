


// Get the objects we need to modify
let addOrderForm2 = document.getElementById('add-order-form-2');

// Modify the objects we need
addOrderForm2.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerName = document.getElementById("input-customer-name-2");
    let inputOrderDate = document.getElementById("input-order-date-2");
    let inputOrderTime = document.getElementById("input-order-time-2");
    let inputTotalAmount = document.getElementById("input-total-amount-2");
    let inputMenuItemID = document.getElementById("input-menuItem-id-2");

    // Get the values from the form fields
    let customerNameValue = inputCustomerName.value;
    let orderDateValue = inputOrderDate.value;
    let orderTimeValue = inputOrderTime.value;
    let totalAmountValue = inputTotalAmount.value;
    let menuItemIDValue = inputMenuItemID.value;

    // Put our data we want to send in a javascript object
    let data = {
        customerName: customerNameValue,
        orderDate: orderDateValue,
        orderTime: orderTimeValue,
        totalAmount: totalAmountValue,
        menuItemID: menuItemIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-form-2", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerName.value = '';
            inputOrderDate.value = '';
            inputOrderTime.value = '';
            inputTotalAmount.value = '';
            inputMenuItemID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from orders
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("orders");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let orderIDCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let orderTimeCell = document.createElement("TD");
    let totalAmountCell = document.createElement("TD");
    let menuItemCell = document.createElement("TD"); 
    let deleteCell = document.createElement("TD"); 

    // Fill the cells with correct data
    row.setAttribute("data-value", newRow.order_id);
    orderIDCell.innerText = newRow.order_id;
    customerIDCell.innerText = newRow.customer_id;
    orderDateCell.innerText = newRow.order_date;
    orderTimeCell.innerText = newRow.order_time;
    totalAmountCell.innerText = newRow.total_amount;
    menuItemCell.innerText = newRow.menu_item_id;
    deleteCell.innerHTML = '<button onclick="deleteOrder(' + newRow.order_id + ')">Delete</button>';

    // Add the cells to the row 
    row.appendChild(orderIDCell);
    row.appendChild(customerIDCell);
    row.appendChild(orderDateCell);
    row.appendChild(orderTimeCell);
    row.appendChild(totalAmountCell);
    row.appendChild(menuItemCell);
    row.appendChild(deleteCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
