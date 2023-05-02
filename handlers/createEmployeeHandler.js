const createEmployeeService = require("../services/createEmployeeService").createEmployeeService

// Create Employee
module.exports.createEmployee = async (event, context, callback) => {

    const { employee_name, company_title, year_hired, birthdate, salary, image, team } = JSON.parse(event.body)

    const { result, statusCode } = await createEmployeeService(employee_name, company_title, year_hired, birthdate, salary, image, team)

    return {
        
        body: result,
        statusCode: statusCode

    }
}