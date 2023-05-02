const getCompanyByIdService = require("../services/getCompanyByIdService").getCompanyByIdService

//  Get Company by ID API
module.exports.getCompanyById = async (event, context, callback) => {

    const { company_id } = event.pathParameters
    
    const { result, statusCode } = await getCompanyByIdService(company_id)

    return {
        
        body: result,
        statusCode: statusCode
    }
  
}