const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find()
  if (!employees) return res.status(204).json({ message: 'No employees found.' })
  res.json(employees)
}

const createNewEmployee = async (req, res) => {
  if (!req.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({ message: 'First and last names are required.' })
  }

  // create and return the employee
  try {
    const result = await Employee.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    })

    res.status(201).json(result)
  } catch (err) {
    console.log(err)
  }
}

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' })
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec()
  // employee does not exist
  if (!employee) {
    return res.status(204).json({ message: `No employee matches ID ${req.body.id}.` })
  }

  if (req.body?.firstname) employee.firstName = req.body.firstname
  if (req.body?.lastname) employee.lastName = req.body.lastname

  // update the employee with newEmployee
  const result = await employee.save()
  res.json(result)
}

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'Employee ID required.' })

  // check if there is an employee match the id
  const employee = await Employee.findOne({ _id: req.body.id }).exec()

  // employee does not exist
  if (!employee) {
    return res.status(204).json({ message: `No employee matches ID ${req.body.id}.` })
  }

  // remove the employee
  const result = await employee.deleteOne({ _id: req.body.id })
  res.json(result)
}

const getEmployee = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'Employee ID required.' })

  // check if there is an employee match the id
  const employee = await Employee.findOne({ _id: req.params.id }).exec()

  // employee does not exist
  if (!employee) {
    return res.status(204).json({ message: `No employee matches ID ${req.params.id}.` })
  }

  res.json(employee)
}

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }
