const Employee = require("../models/Employee");

const home = async (req, res) => {
  res.render("./home/index.ejs");
};

const index = async (req, res) => {
  const allEmployees = await Employee.find({});
  console.log("all employees: ", allEmployees);
  res.render("./employee/index.ejs", { allEmployees });
};
const showCreateForm = async (req, res) => {
  res.render("./employee/new.ejs");
};

const show = async (req, res) => {
  const employeeId = req.params.employeeId;
  const oneEmployee = await Employee.findById(employeeId);
  console.log("one employees: ", oneEmployee);
  res.render("./employee/details.ejs", { oneEmployee });
};
const create = async (req, res) => {
  console.log(req.body);
  const newEmployee = await Employee.create(req.body);
  console.log("New employee: ", newEmployee);
  res.redirect("/employee");
};
const showUpdateForm = async (req, res) => {
  const employeeId = req.params.employeeId;
  const oneEmployee = await Employee.findById(employeeId);
  console.log("Employee to be updated: ", oneEmployee);
  res.render("./employee/update.ejs", { oneEmployee });
};
const update = async (req, res) => {
  const updateId = req.params.employeeId;
  const updateDetails = req.body;
  console.log("update details: ", updateDetails);
  const updatedEmployee = await Employee.findByIdAndUpdate(
    updateId,
    updateDetails,
    { new: true }
  );
  console.log("Updated details: ", updatedEmployee);
  //res.redirect("/employee");
  res.redirect("/employee");
};
const del = async (req, res) => {
  const deleteId = req.params.employeeId;
  await Employee.findByIdAndDelete(deleteId);
  res.redirect("/employee");
};

module.exports = {
  index,
  show,
  create,
  update,
  del,
  home,
  showCreateForm,
  showUpdateForm,
};
