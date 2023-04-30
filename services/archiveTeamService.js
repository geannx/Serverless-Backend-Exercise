const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Team = require("../models/Team")

// Archive Team - Should also archive all employees
module.exports.archiveTeamService = async (team_id) => {

    try {

        const team = await databaseQuery(`SELECT team_name FROM team WHERE team_id = ${team_id}`)
        const team_name = team.rows[0].team_name

        await Promise.all([

            databaseQuery(`UPDATE team SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE team_id = ${team_id}`),
            databaseQuery(`UPDATE employees SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE team ='${team_name}'`)
        ]);

        return {
            result: null,
            statusCode: 200
        }
    } catch (error) {
        return {
            body: JSON.stringify({ message: error }),
            statusCode: 400
        }
    }
}