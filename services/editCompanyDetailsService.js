const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

module.exports.editCompanyDetailsService = async(company_id, company_name, company_address, year_founded) => {

    try {

        await databaseQuery(`UPDATE companies SET company_name = '${company_name}', company_address = '${company_address}', year_founded = ${year_founded}, modified_at = CURRENT_TIMESTAMP WHERE company_id = ${company_id}`)
      
        return {
            result: null,
            statusCode: 204 // 204 = No Context yung response body
        }
        
    } catch (error) {
        console.log(error)
        return {
            body: JSON.stringify({ message: error }),
            statusCode: 400
        }
    }
}

