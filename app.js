/*
    SETUP for a simple web app 
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.static('public'));  // Static Files
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT        = 17350;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.









/*
    ROUTES
*/


// render the index page 
app.get('/', function(req, res) {
    res.render('index.hbs');
  });



// render the employee page 
app.get('/employee', function(req, res) {
    let query1;
    let query2 = 'SELECT store_id, location FROM store;'; // query to get store table info this is for the drop down
  
    if (req.query.name === undefined) {
        query1 = 'SELECT employees.*, store.location AS store_location FROM employees INNER JOIN store ON employees.store_id = store.store_id;'; // display the relevant store location as well in the table
    } else {
        query1 = `SELECT employees.*, store.location AS store_location FROM employees INNER JOIN store ON employees.store_id = store.store_id WHERE name LIKE "${req.query.name}%";`; // if there is something in the search box 
    }
  
    db.pool.query(query2, function(error, rows, fields) {                           // query to get store table info this is for the drop down
      let stores = rows.map(row => ({id: row.store_id, location: row.location}));   
  
      db.pool.query(query1, function(error, rows, fields) {                         // nested so it can access stores array this is for the table 
        res.render('employee', {data: rows, stores: stores});  
      });
    });
  }); 
                                                           


// add to employee table
app.post('/add-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO employees (store_id, name, birthdate, address, phone_number) VALUES  ('${data['storeID']}', '${data['name']}', '${data['birthdate']}', '${data['address']}', '${data['phoneNumber']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM employees and
        // presents it on the screen
        else
        {
            query2 = 'SELECT employees.*, store.location AS store_location FROM employees INNER JOIN store ON employees.store_id = store.store_id;';
            db.pool.query(query2, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)
                    
                }
            })
        }
    })
})



// delete from employee table 
app.delete('/delete-employee', function(req,res,next){
    let data = req.body;
    let personID = parseInt(data.employee_id);
    let delete_employee = "DELETE FROM employees WHERE employee_id = ?;";
  
  
          // Run the 1st query
          db.pool.query(delete_employee, [personID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else {
                res.sendStatus(204);
            }
              

  })});


// update employee table
  app.put('/update-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `UPDATE employees SET name = '${data['name']}', birthdate = '${data['birthdate']}', address = '${data['address']}', phone_number = '${data['phoneNumber']}', store_id = '${data['storeID']}' WHERE employee_id = '${data['employee_id']}'`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM employees and
        // presents it on the screen
        else
        {
            query2 = 'SELECT employees.*, store.location AS store_location FROM employees INNER JOIN store ON employees.store_id = store.store_id;';
            db.pool.query(query2, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                    
                }
            })
        }
    })
})


//////////////////////////////////////////////////////////////////////////////////////////////// stores page
app.get('/store', function(req, res) {
    let query = 'SELECT * FROM store;';
  
    db.pool.query(query, function(error, rows, fields) {
        if (error) throw error;

        res.render('store', {data: rows});  
    });
});


app.post('/add-store-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query = `INSERT INTO store (location, franchisee) VALUES ('${data['location']}', '${data['franchisee']}')`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM store and presents it on the screen
        else
        {
            query = 'SELECT * FROM store;';
            db.pool.query(query, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
})

app.delete('/delete-store', function(req, res, next) {
    let data = req.body;
    let storeID = parseInt(data.store_id);
    
    let deleteStore = "DELETE FROM store WHERE store_id = ?;";
  
    // Run the delete query on the database
    db.pool.query(deleteStore, [storeID], function(error, rows, fields) {
      if (error) {
        // Log the error to the terminal and send the client an HTTP response indicating the request was bad
        console.log(error);
        res.sendStatus(400);
      } else {
        // Send the client an HTTP response indicating success
        res.sendStatus(204);
      }
    });
  });
  



//////////////////////////////////////////////////////////////////////////////////////////////// inventory page 

// render the inventory page
app.get('/inventory', function(req, res) {
    let query1 = 
    `SELECT i.inventory_id, i.store_id, i.milk_amount, i.tea_amount, i.boba_amount, s.location AS store_location
    FROM inventory i
    INNER JOIN store s
    ON i.store_id = s.store_id;
    `;
    let query2 = `SELECT store_id as id, location
    FROM store
    WHERE NOT EXISTS (
      SELECT 1
      FROM inventory
      WHERE inventory.store_id = store.store_id
    )`; 

    db.pool.query(query2, function(error, rows, fields) {
        let stores = rows.map(row => ({id: row.id, location: row.location}));   
        
        db.pool.query(query1, function(error, rows, fields) {                        
            res.render('inventory', {data: rows, stores: stores});  
        });
    });
});



// add to inventory table
app.post('/add-inventory-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO inventory (inventory_id, store_id, milk_amount, tea_amount, boba_amount) 
    VALUES (${data['storeID']}, ${data['storeID']}, ${data['milkAmount']}, ${data['teaAmount']}, ${data['bobaAmount']})`;
    
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            query2 = `SELECT i.inventory_id, i.store_id, i.milk_amount, i.tea_amount, i.boba_amount, s.location AS store_location
            FROM inventory i
            INNER JOIN store s
            ON i.store_id = s.store_id;
            `;
            db.pool.query(query2, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                    
                }
            })
        }
    })
})


// delete from inventory table
app.delete('/delete-inventory', function(req,res,next){
    let data = req.body;
    let inventoryID = parseInt(data.inventory_id);
    let delete_inventory = "DELETE FROM inventory WHERE inventory_id = ?;";


    // Run the query
    db.pool.query(delete_inventory, [inventoryID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    });
});

//////////////////////////////////////
app.get('/order_menu_item', function(req, res) {
    let query = `SELECT * FROM order_menu_item;`;
  
    db.pool.query(query, function(error, rows, fields) {
        if (error) throw error;

        res.render('order_menu_item', {data: rows});  
    });
});



/////////////////////////////////////
app.get('/menuItem', function(req, res) {
    let query = `SELECT * FROM menuItem;`;
    let query2 = `SELECT inventory_id FROM inventory;`; // for the select drop down 
  
    db.pool.query(query, function(error, rows, fields) {
      if (error) throw error;

    db.pool.query(query2, function(error, rows2, fields2) {
        if (error) throw error;
        let inventories = rows2.map(row => ({id: row.inventory_id}));
  
        res.render('menuItem', {data: rows, inventories: inventories});  
        
      });
    });
  });


app.post('/add-menuItem-form', function(req, res) {

    let data = req.body;
    query = `INSERT INTO menuItem (inventory_id, item_cost, item_name) VALUES ('${data['inventory_id']}', '${data['item_cost']}', '${data['item_name']}')`;
  
    db.pool.query(query, function(error, rows, fields) {

      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM menuItem and presents it on the screen
        query2 = `SELECT * FROM menuItem;`;
        db.pool.query(query2, function(error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.send(rows);
          }
        });
      }
    });
  });
  

app.delete('/delete-menuItem', function(req, res) {
    let data = req.body;
    let menuItemID = parseInt(data.menu_item_id);
    let deleteMenuItemQuery = "DELETE FROM menuItem WHERE menu_item_id = ?;";

    db.pool.query(deleteMenuItemQuery, [menuItemID], function(error, rows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(400);
        } else {
        res.sendStatus(204);
        }
    });
});
  

//////////////////////////////////
app.get('/customer', function(req, res) {
  let query = `SELECT * FROM customer;`;
   
  db.pool.query(query, function(error, rows, fields) {
    if (error) throw error;

    res.render('customer', { data: rows });
  });
});

  
app.post('/add-customer', function(req, res) {
  let data = req.body;
  let query = `INSERT INTO customer (name) VALUES ('${data['name']}')`;

  db.pool.query(query, function(error, rows, fields) {
    if (error) {
        console.log(error);
        res.sendStatus(400);
    } else {
        let selectQuery = `SELECT * FROM customer`;

        db.pool.query(selectQuery, function(error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.send(rows);
          }
        });
    }
  });
});


app.delete('/delete-customer', function(req, res, next) {
  let data = req.body;
  let customerId = parseInt(data.customer_id);
  let deleteCustomerQuery = "DELETE FROM customer WHERE customer_id = ?;";

  db.pool.query(deleteCustomerQuery, [customerId], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

  
  




///////////////////////////////////
app.get('/order', function(req, res) {
    let query = 'SELECT * FROM `order`';
    let query2 = 'SELECT menu_item_id, item_name FROM menuItem';

    db.pool.query(query, function(error, rows, fields) {
        if (error) throw error;

        db.pool.query(query2, function(error, rows2, fields2) {
            if (error) throw error;

            res.render('order', {data: rows, menuItems: rows2});
        });
    });
});


// add order to table this one is different because we have the 2 circumstances pay with card or cash so 2 different forms

app.post('/add-order-form', function(req, res){
    let data = req.body;
    query = `INSERT INTO \`order\` (customer_id, order_date, order_time, total_amount, menu_item_id) 
             VALUES (${data.customerID || 'NULL'}, '${data.orderDate}', '${data.orderTime}', ${data.totalAmount}, ${data.menuItemID})`;

    db.pool.query(query, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else{
            query = `SELECT * FROM \`order\``;
            db.pool.query(query, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)  
                }
            })
        }
    })
});

app.post('/add-order-form-2', function(req, res) {
    let data = req.body;
  
    // Add the customer to the database
    let query1 = `INSERT INTO customer (name) VALUES ('${data['customerName']}')`;
    db.pool.query(query1, function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        // Get the customer ID that was just generated
        const customerId = rows.insertId;
  
        // Add the order to the database with the new customer ID
        let query2 = `INSERT INTO \`order\` (customer_id, order_date, order_time, total_amount, menu_item_id) VALUES (${customerId}, '${data['orderDate']}', '${data['orderTime']}', '${data['totalAmount']}', '${data['menuItemID']}')`;
        db.pool.query(query2, function(error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            query3 = `SELECT * FROM \`order\``;
            db.pool.query(query3, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)  
                }
            })
            
          }
        });
      }
    });
  });
  

// DELETE request to delete an order
app.delete('/delete-order', function(req, res, next) {
  let data = req.body;
  let orderID = parseInt(data.order_id);
  let delete_order = "DELETE FROM `order` WHERE order_id = ?;";

  // Run the DELETE query
  db.pool.query(delete_order, [orderID], function(error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // Send a success status code
      res.sendStatus(204);
    }
  });
});







/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});