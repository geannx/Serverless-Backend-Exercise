const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Employee = require("../models/Employee")

// Get All Employee By Team
module.exports.getEmployeeByTeamService = async (team_name) => {

    try {

        const result = await databaseQuery(`SELECT * FROM employees WHERE team = '${team_name}' AND archived = false`)

        const employees = result.rows.map(item => {

            const employee = new Employee(item.employee_id, item.employee_name, item.company_title, item.year_hired, item.birthdate, item.salary, item.image, item.team, item.created_at, item.modified_at, item.archived)
            
            return employee;
        })

        return {

            result: JSON.stringify({ result: employees }),
            statusCode: 200
        }

    } catch (error) {

        return {

            result: JSON.stringify({ message: error }),
            statusCode: 400
        }
    }
}