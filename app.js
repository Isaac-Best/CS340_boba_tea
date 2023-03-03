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
app.get('/', function(req, res)
 


    {  
        let query1 = 'SELECT employees.*, store.location AS store_location FROM employees INNER JOIN store ON employees.store_id = store.store_id;'; // display the relevant store location as well in the table 

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

                let stores = rows.map(row => ({id: row.store_id, location: row.store_location}));   // this is for the store select drop down                           
                res.render('index', {data: rows, stores: stores});  
                 

        })           
        
 
    });                                                         



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

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
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










/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});