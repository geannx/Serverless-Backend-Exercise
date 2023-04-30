const editCompanyDetailsService = require("../services/editCompanyDetailsService").editCompanyDetailsService

// Edit Company Details - Edit All Details API
module.exports.editCompanyDetails = async(event, context, callback) => {

    const { company_id } = event.pathParameters
    const { company_name, company_address, year_founded } = JSON.parse(event.body)
    const { result, statusCode } = await editCompanyDetailsService(company_id, company_name, company_address, year_founded)

    return {
        result: result ? JSON.stringify({ result: result }) : null,
        statusCode: statusCode
    }

  }