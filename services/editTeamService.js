const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Team = require("../models/Team")

// Edit Team Details - Edit All Details
module.exports.editTeamService = async (team_id, team_name, team_leader, company) => {

    try {

        await databaseQuery(`UPDATE team SET team_name = '${team_name}', team_leader = '${team_leader}', company = '${company}', modified_at = CURRENT_TIMESTAMP WHERE team_id = ${team_id}`)

        return {
            result: null,
            statusCode: 204 // 204 = No Context yung response body
        }

    } catch (error) {

        return {

            body: JSON.stringify({ message: error }),
            statusCode: 400
        }
    }
}