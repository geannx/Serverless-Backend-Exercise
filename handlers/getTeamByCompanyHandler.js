const getTeamByCompanyServices = require("../services/getTeamByCompanyServices").getTeamByCompanyServices

// Get All Team by Company API
module.exports.getTeamByCompany = async (event, context, callback) => {

    const { company_name } = event.pathParameters

    const { result, statusCode } = await getTeamByCompanyServices(company_name)

    return {

        body: result,
        statusCode: statusCode

    }
}