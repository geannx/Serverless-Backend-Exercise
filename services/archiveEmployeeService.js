const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

// Archive Employee
module.exports.archiveEmployeeService = async (employee_id) => {

    try {

        await databaseQuery(`UPDATE employees SET modified_at = CURRENT_TIMESTAMP, archived = true WHERE employee_id = ${employee_id}`)

        return {

            body: null,
            statusCode: 204

        }

    } catch (error) {

        return {

            result: JSON.stringify({ message: error }),
            statusCode: 404

        }
    }
}