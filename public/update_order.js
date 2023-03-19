


let updateOrderForm = document.getElementById('update-order-form');


updateOrderForm.addEventListener("submit", function (e) {


    e.preventDefault();


    let orderID = document.getElementById("input-order-id-3");
    let inputCustomerName = document.getElementById("input-customer-name-3");
    let inputOrderDate = document.getElementById("input-order-date-3");
    let inputOrderTime = document.getElementById("input-order-time-3");
    let inputTotalAmount = document.getElementById("input-total-amount-3");
    let inputMenuItemID = document.getElementById("input-menuItem-id-3");


    let orderIDValue = orderID.value;
    let customerNameValue = inputCustomerName.value;
    let orderDateValue = inputOrderDate.value;
    let orderTimeValue = inputOrderTime.value;
    let totalAmountValue = inputTotalAmount.value;
    let menuItemIDValue = inputMenuItemID.value;


    let data = {
        order_id: orderIDValue,
        customer_name: customerNameValue,
        order_date: orderDateValue,
        order_time: orderTimeValue,
        total_amount: totalAmountValue,
        menu_item_id: menuItemIDValue
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-order-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

    
            updateRow(xhttp.response, data.order_id);

  
            orderID.value = '';
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


    xhttp.send(JSON.stringify(data));

})


function updateRow(data, order_id){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("orders");
    
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == order_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

 
            updateRowIndex.getElementsByTagName("td")[0].innerHTML = parsedData[i-1].order_id;
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData[i-1].customer_id;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[i-1].order_date;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[i-1].order_time;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData[i-1].total_amount;
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = parsedData[i-1].menu_item_id;
        }
    }
}
