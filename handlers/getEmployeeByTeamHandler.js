const getEmployeeByTeamService = require("../services/getEmployeeByTeamService").getEmployeeByTeamService

// Get All Employee By Team API
module.exports.getEmployeeByTeam = async (event, context, callback) => {

    const { team_name } = event.pathParameters

    const { result, statusCode } = await getEmployeeByTeamService(team_name)

    return {

        body: result,
        statusCode: statusCode
        
    }
}