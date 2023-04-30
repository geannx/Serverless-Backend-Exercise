const createNewCompanyService = require("../services/createNewCompanyService").createNewCompany

// Create New Company API
module.exports.createNewCompany = async (event, context, callback) => {
  
    const { company_name, company_address, year_founded} = JSON.parse(event.body);

    const { result, statusCode } = await createNewCompanyService(company_name, company_address, year_founded)

    return {
        body: result,
        statusCode: statusCode
    }
}