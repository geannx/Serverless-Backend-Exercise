const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

// Edit Employee Details - Edit All Details
module.exports.editEmployeeService = async (employee_id, employee_name, company_title, year_hired, birthdate, salary, image, team) => {

    try {

        await databaseQuery(`UPDATE employees SET employee_name = '${employee_name}', company_title = '${company_title}', year_hired = ${year_hired}, birthdate = '${birthdate}', 
        salary = ${salary}, image = '${image}', team = '${team}', modified_at = CURRENT_TIMESTAMP WHERE employee_id = ${employee_id}`)

        return {

            result: none,
            statusCode: 204

        }
    } catch (error) {
        console.log(error)
        return {

            result: JSON.stringify({ message: error }),
            statusCode: 400

        }
    }
}