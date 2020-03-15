//Required Dependencies for functionality
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "Thatsmydawg69!",
    database: "COMPANY_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection as id:" + connection.threadId);
    console.log("worked dude")
  });