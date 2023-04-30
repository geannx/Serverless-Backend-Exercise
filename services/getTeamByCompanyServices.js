const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Team = require("../models/Team")

module.exports.getTeamByCompanyServices = async (company_name) => {

    try {

        const result = await databaseQuery(`SELECT * FROM team WHERE archived = false AND company = '${company_name}'`)

        const teams = result.rows.map(item => {

            const team = new Team(item.team_id, item.team_name, item.team_leader, item.company, item.created_at, item.modified_at, item.archived)

            return team;
        })

        return {

            result: JSON.stringify({ result: teams }),
            statusCode: 200

        }

    } catch (error) {
        return {

            result: JSON.stringify({ message: error }),
            statusCode: 400

        }
    }
}