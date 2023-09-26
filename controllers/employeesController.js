const data = {
  employees: require('../model/employees.json'),
  setEmployees: function (data) {
    this.employees = data
  },
}

const getAllEmployees = (req, res) => {
  res.json(data.employees)
}

const createNewEmployee = (req, res) => {
  const newEmployee = {
    // check if the employees array is empty
    id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }

  // check the body
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({ message: 'First and last names are required.' })
  }

  data.setEmployees([...data.employees, newEmployee])
  res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
  // check if there is an employee match the id
  const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id))

  // employee does not exist
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` })
  }

  if (req.body.firstname) employee.firstname = req.body.firstname
  if (req.body.lastname) employee.lastname = req.body.lastname

  // remove the employee from the list and append the new employee data, then sort the array
  const filteredArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id))
  const unsortedArray = [...filteredArray, employee]
  data.setEmployees(unsortedArray.sort((a, b) => a.id - b.id))
  res.json(data.employees)
}

const deleteEmployee = (req, res) => {
  // check if there is an employee match the id
  const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id))

  // employee does not exist
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` })
  }

  // remove the employee
  const filteredArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id))
  data.setEmployees(filteredArray)
  res.json(data.employees)
}

const getEmployee = (req, res) => {
  // check if there is an employee match the id
  const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id))

  // employee does not exist
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.params.id} not found` })
  }

  res.json(employee)
}

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }
