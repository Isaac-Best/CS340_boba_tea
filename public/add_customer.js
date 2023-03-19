
let addCustomerForm = document.getElementById('add-customer-form');


addCustomerForm.addEventListener("submit", function (e) {
    e.preventDefault();


    let inputOrderID = document.getElementById("input-order-id");
    let inputName = document.getElementById("input-name");

    let orderIDValue = inputOrderID.value;
    let nameValue = inputName.value;

    let data = {
        orderID: orderIDValue,
        name: nameValue
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputOrderID.value = '';
            inputName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


addRowToTable = (data) => {

    let currentTable = document.getElementById("customers");
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]


    let row = document.createElement("TR");
    let customerIDCell = document.createElement("TD");
    let orderIDCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");


    row.setAttribute("data-value", newRow.customer_id);
    customerIDCell.innerText = newRow.customer_id;
    orderIDCell.innerText = newRow.order_id;
    nameCell.innerText = newRow.name;
    deleteCell.innerHTML = '<button onclick="deleteCustomer(' + newRow.customer_id + ')">Delete</button>';

    row.appendChild(customerIDCell);
    row.appendChild(orderIDCell);
    row.appendChild(nameCell);
    row.appendChild(deleteCell);
    
    currentTable.appendChild(row);
}
