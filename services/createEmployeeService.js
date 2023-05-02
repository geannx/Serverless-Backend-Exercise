const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Employee = require("../models/Employee")

// Create Employee
module.exports.createEmployeeService = async (employee_name, company_title, year_hired, birthdate, salary, image, team) => {

    try {

        const employee = new Employee(null, employee_name, company_title, year_hired, birthdate, salary, image, team, null  , null, null)


        const result = await databaseQuery(`INSERT INTO employees (employee_name, company_title, year_hired, birthdate, salary, image, team, created_at, modified_at, archived) 
                                            VALUES ('${employee.employee_name}', '${employee.company_title}', ${employee.year_hired}, '${employee.birthdate}', ${employee.salary}, 
                                            '${employee.image}', '${employee.team}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)`)

        return {

            result: JSON.stringify({ result: result }),
            statusCode: 200

        }

    } catch (error) {

        return {

            result: JSON.stringify({ message: error }),
            statusCode: 400

        }
    }
}