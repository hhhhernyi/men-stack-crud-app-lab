// IMPORTS
const express = require('express');
const dotenv = require("dotenv"); 
const mongoose = require("mongoose"); 
const methodOverride = require("method-override");
const path = require("path");
const morgan = require("morgan")
const Employee = require('./models/Employee')

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

// home page
app.get("/home", async (req, res) => {
    res.render("./home/index.ejs");
  });

// show all employees
app.get("/employee", async (req, res) => {
    const allEmployees = await Employee.find({})
    console.log('all employees: ',allEmployees)
    res.render("./employee/index.ejs", {allEmployees});
  });

 // show form to create new employee
app.get("/employee/new", async (req, res) => {
    res.render("./employee/new.ejs");
  }); 

// show the details of one employee
app.get("/employee/:employeeId", async (req, res) => {
    const employeeId = req.params.employeeId;
    const oneEmployee = await Employee.findById(employeeId)
    console.log('one employees: ',oneEmployee)
    res.render("./employee/details.ejs", {oneEmployee});
  });

// method to create new employee
app.post("/employee", async (req, res) => {
    console.log(req.body)
    const newEmployee = await Employee.create(req.body)
    console.log('New employee: ', newEmployee)
    res.redirect('/employee')
   });
// show the form to update a employee
app.get("/employee/:employeeId/edit", async (req, res) => {
    const employeeId = req.params.employeeId;
    const oneEmployee = await Employee.findById(employeeId)
    console.log('Employee to be updated: ',oneEmployee)
    res.render("./employee/update.ejs", {oneEmployee});
  });
app.put("/employee/:employeeId", async (req,res)=>{
    const updateId = req.params.employeeId
    const updateDetails = req.body
    console.log('update details: ',updateDetails)
    const updatedEmployee = await Employee.findByIdAndUpdate(updateId,
        updateDetails,
        {new: true})
    console.log('Updated details: ', updatedEmployee)
    //res.redirect("/employee");
    res.redirect('/employee')
  });
// method to delete employee
app.delete("/employee/:employeeId", async (req,res)=>{
    const deleteId = req.params.employeeId
    await Employee.findByIdAndDelete(deleteId)
    res.redirect("/employee");
  });
// method to update an employee

// LISTEN
app.listen(3000, () => {
    console.log('Listening on port 3000');
  });