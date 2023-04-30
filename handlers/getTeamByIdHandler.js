const getTeamByCompanyService = require("../services/getTeamByIdService").getTeamByIdService

module.exports.getTeamById = async (event, context, callback) => {

    const { id } = event.pathParameters

    const { result, statusCode } = await getTeamByCompanyService(id)

    return {
        body: result,
        statusCode: statusCode
    }
  
}