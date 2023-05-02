const getEmployeeByCompanyService = require("../services/getEmployeeByCompanyServices").getEmployeeByCompanyService

// Get All Employee By Company API
module.exports.getEmployeeByCompany = async (event, context, callback) => {

    const { company_name } = event.pathParameters

    const { result, statusCode } = await getEmployeeByCompanyService(company_name)

    return {
      
      body: result,
      statusCode: statusCode
      
    }
  
  }