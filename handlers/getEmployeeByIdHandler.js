const getEmployeeByIdService = require("../services/getEmployeeByIdService").getEmployeeByIdService

// Get Employee By ID API
module.exports.getEmployeeById = async (event, context, callback) => {

    const { employee_id } = event.pathParameters
    
    const { result, statusCode } = await getEmployeeByIdService(employee_id)

    return {

        body: result,
        statusCode: statusCode
    }
}