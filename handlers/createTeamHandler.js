const createTeamService = require("../services/createTeamService").createTeamService

// Create Team for Specific Company ID API
module.exports.createTeam = async (event, context, callback) => {

    const { id } = event.pathParameters
    const { team_name, team_leader } = JSON.parse(event.body)

    const { result, statusCode } = await createTeamService(id, team_name, team_leader)

    return {

        body: result,
        statusCode: statusCode
    }
}