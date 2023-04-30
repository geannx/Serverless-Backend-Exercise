const archiveTeamService = require("../services/archiveTeamService").archiveTeamService

// Archive Team - Should also archive all employees API
module.exports.archiveTeam = async (event, context, callback) => {

    const { team_id } = event.pathParameters

    const { result, statusCode } = archiveTeamService(team_id)

    return {

        body: result,
        statusCode: statusCode
    }
}