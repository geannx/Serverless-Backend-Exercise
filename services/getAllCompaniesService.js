const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Company = require("../models/Company")

module.exports.getAllCompaniesService = async (event, context, callback) => {

    try {

        const result = await databaseQuery(`SELECT * FROM companies WHERE archived = false`)

        const companies = result.rows.map(item => {

            const company = new Company(item.company_id, item.company_name, item.company_address, item.year_founded, item.created_at, item.updated_at, item.archived)

            return company;
        })

        return {
            result: JSON.stringify({ result: companies }),
            statusCode: 200
        }

    } catch (error) {

        return {

            result: JSON.stringify({ message: error }),
            statusCode: 400
        }
    }
}