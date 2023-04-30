const getAllCompaniesService = require("../services/getAllCompaniesService").getAllCompaniesService

// Get All Companies API
module.exports.getAllCompanies = async (event, context, callback) => {

  const { result, statusCode } = await getAllCompaniesService()
  
    return {
      body: result,
      statusCode: statusCode
    } 
}