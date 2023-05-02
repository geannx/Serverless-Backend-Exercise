const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Employee = require("../models/Employee")

// Get Employee By ID
module.exports.getEmployeeByIdService = async (employee_id) => {

  
    try {

      const [ result ] = (await databaseQuery(`SELECT * FROM employees WHERE employee_id = ${employee_id} AND archived = false`)).rows
    
      const employee = new Employee(result.employee_id, result.employee_name, result.company_title, result.year_hired, result.birthdate, result.salary, result.image, result.team, result.created_at, result.modified_at, result.archived)
    
      return {

        result: JSON.stringify({ result: employee }),
        statusCode: 200

      }
    } catch (error) {

        return {

          body: JSON.stringify({ message: error }),
          statusCode: 400
        }
      }
  }