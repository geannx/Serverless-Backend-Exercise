const editEmployeeService = require("../services/editEmployeeService").editEmployeeService

// Edit Employee Details - Edit All Details API
module.exports.editEmployee = async (event, context, callback) => {

    const { employee_id } = event.pathParameters
    const { employee_name, company_title, year_hired, birthdate, salary, image, team } = JSON.parse(event.body)

    const { result, statusCode } = await editEmployeeService(employee_id, employee_name, company_title, year_hired, birthdate, salary, image, team)

    return {

        body: result,
        statusCode: statusCode

    }
  
  }