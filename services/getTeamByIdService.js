const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Team = require("../models/Team")

// Get Team by ID
module.exports.getTeamByIdService = async (id) => {

    try {

        const [ result ] = (await databaseQuery(`SELECT * FROM team WHERE archived = false AND team_id = ${id}`)).rows

        const team = new Team(result.team_id, result.team_name, result.team_leader, result.company, result.created_at, result.modified_at, result.archived)

        return {

            result: JSON.stringify({ result: team }),
            statusCode: 200

        }
    } catch (error) {
        return {

            result: JSON.stringify({ message: error }),
            statusCode: 400

        }
    }
}