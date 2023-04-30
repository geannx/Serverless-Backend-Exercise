const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Team = require("../models/Team")

// Create Team for Specific Company ID
module.exports.createTeamService = async (id, team_name, team_leader) => {

    try {

        const company_result = await databaseQuery(`SELECT company_name FROM companies WHERE company_id = ${id} AND archived = false`)

        const company = company_result.rows[0].company_name

        const team = new Team(null, team_name, team_leader, company, null, null, false )

        const result = await databaseQuery(`INSERT INTO team (team_name, team_leader, company, created_at, modified_at, archived) VALUES ('${team.getTeamName}', '${team.getTeamLeader}', '${team.getCompany}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)`)

        return {

            result: JSON.stringify({ result: result }),
            statusCode: 200
        }

    } catch (error) {

        return {

            body: JSON.stringify({ message: error }),
            statusCode: 404
        }
    }
}