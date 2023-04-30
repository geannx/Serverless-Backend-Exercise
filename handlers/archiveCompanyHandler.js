const archiveCompanyService = require("../services/archiveCompanyService").archiveCompanyService

// Archive Company - Should also archive all team and employees API
module.exports.archiveCompany = async (event, context, callback) => {

    const { company_id } = event.pathParameters

    const { result, statusCode } = archiveCompanyService(company_id)

    return {
        result: result,
        statusCode: statusCode
    }
  }