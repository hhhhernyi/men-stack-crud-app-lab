// this is the employee model page

// import mongoose
// define the fruit schema
// convert the schema to model
// export model

const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    department: String,
    salary: Number,
    married: String
  });
  
  const Employee = mongoose.model("Employee", employeeSchema);
  module.exports = Employee;
