const archiveEmployeeService = require("../services/archiveEmployeeService").archiveEmployeeService

// Archive Employee API
module.exports.archiveEmployee = async (event, context, callback) => {

    const { employee_id } = event.pathParameters

    const { result, statusCode } = archiveEmployeeService(employee_id)

    return {

        body: result,
        statusCode: statusCode
    }
  
  }