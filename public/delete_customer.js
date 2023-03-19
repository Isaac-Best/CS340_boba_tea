

function deleteCustomer(customer_id) {
  
    let data = {
      customer_id: customer_id
    };
  

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/delete-customer", true);
    xhr.setRequestHeader("Content-type", "application/json");
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 204) {

          deleteRow(customer_id);
        } else {
          console.error("Error deleting customer.");
        }
      }
    };

    xhr.send(JSON.stringify(data));
  }
  

function deleteRow(customer_id) {
    let table = document.getElementById("customers");
    
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].getAttribute("data-value") === customer_id.toString()) {
        table.deleteRow(i);
        break;
        }
}
}
