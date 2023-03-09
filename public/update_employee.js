// Get the objects we need to modify
let updateEmployeeForm = document.getElementById('update-employee-form');


// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let employeeID = document.getElementById("update-employeeID");
    let inputName = document.getElementById("update-name");
    let inputBirthdate = document.getElementById("update-birthdate");
    let inputAddress = document.getElementById("update-address");
    let inputPhoneNumber = document.getElementById("update-PhoneNumber");
    let inputStoreID = document.getElementById("update-storeID");


    // Get the values from the form fields
    let employeeIDValue = employeeID.value;
    let nameValue = inputName.value;
    let birthdateValue = inputBirthdate.value;
    let addressValue = inputAddress.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let storeIDValue = inputStoreID.value;

    // Put our data we want to send in a javascript object
    let data = {
        employee_id: employeeIDValue,
        name: nameValue,
        birthdate: birthdateValue,
        address: addressValue,
        phoneNumber: phoneNumberValue,
        storeID: storeIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-employee-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the row in the table with the new data
            
            updateRow(xhttp.response, data.employee_id);

            // Clear the input fields for another transaction
            employeeID.value = '';
            inputName.value = '';
            inputBirthdate.value = '';
            inputAddress.value = '';
            inputPhoneNumber.value = '';
            inputStoreID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Load the employees and create the dropdown
function updateRow(data, emp_id){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("employees");

    console.log(parsedData)
    
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == emp_id) {


            console.log(parsedData[i-1], 'printing the index')
            console.log(i)

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Update all of the row items with the new data
            updateRowIndex.getElementsByTagName("td")[0].innerHTML = parsedData[i-1].employee_id;
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData[i-1].name;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[i-1].birthdate;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[i-1].address;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData[i-1].phone_number;
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = parsedData[i-1].store_id;
        }
    }
}