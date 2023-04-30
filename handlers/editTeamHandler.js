const editTeamService = require("../services/editTeamService").editTeamService

// Edit Team Details - Edit All Details api
module.exports.editTeam = async (event, context, callback) => {

    const { team_id } = event.pathParameters

    const { team_name, team_leader, company } = JSON.parse(event.body)

    const { result, statusCode } = editTeamService(team_id, team_name, team_leader, company)

    return {

        body: result,
        statusCode: statusCode
    }

}