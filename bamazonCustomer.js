var mysql = require("mysql");
var inquirer = require("inquirer");

// This is the code to call the npm for the table
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Sabroso@32",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId + "\n");
  displaySalesItems();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Find songs by artist":
          artistSearch();
          break;

        case "Find all artists who appear more than once":
          multiSearch();
          break;

        case "Find data within a specific range":
          rangeSearch();
          break;

        case "Search for a specific song":
          songSearch();
          break;
      }
    });
}

// This function 

function displaySalesItems() {
  connection.query("SELECT item_id as ID, product_name as Names , price as Prices FROM products", function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement     
    console.log("ITEMS AVAILABLE FOR SALE\n");
    console.table(res);
    buyFromSalesTable();
    connection.end();
  });
}


// This is the function to search for the ID and the stock quantity

function buyFromSalesTable() {
  inquirer
    .prompt([{
        type: "input",
        name: "action1",
        message: "Please enter the ID of the product you would like to buy",
      },
      {
        type: "input",
        name: "action2",
        message: "How many units would you like to buy?"
      }
    ])
    .then(function (answer) {
      var itemId = answer.action1;

      var queryStr = `SELECT * FROM products WHERE ?`;
      connection.query(queryStr, {item_id: itemId},
        function (err, res) {
          
            // console.log("ID: " + res.item_id + " || Stock Quantity: " + res.stock_quantity);
          console.log(res);
          
        });
    });
}