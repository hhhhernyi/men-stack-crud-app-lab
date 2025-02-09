// IMPORTS
const express = require('express');
const dotenv = require("dotenv"); 
const mongoose = require("mongoose"); 
const methodOverride = require("method-override");
const path = require("path");
const morgan = require("morgan")
const Employee = require('./models/Employee')
const EmployeeController = require('./controllers/EmployeeController')

// CONFIG
dotenv.config(); // Loads the environment variables from .env file
const app = express();
mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB using the connection string in the .env file
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`); // log connection status to terminal on start
  });

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ROUTES

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.get("/home", EmployeeController.home); // show home page
app.get("/employee", EmployeeController.index); // show all employees
app.get("/employee/new", EmployeeController.showCreateForm); // show form to create new employee
app.get("/employee/:employeeId", EmployeeController.show); // show the details of one employee
app.post("/employee",EmployeeController.create ); // method to create new employee
app.get("/employee/:employeeId/edit",EmployeeController.showUpdateForm  ); // show the form to update a employee
app.put("/employee/:employeeId", EmployeeController.update); // method to update an employee
app.delete("/employee/:employeeId", EmployeeController.del); // method to delete employee


// LISTEN
app.listen(3000, () => {
    console.log('Listening on port 3000');
  });