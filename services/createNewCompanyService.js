const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

const Company = require("../models/Company")

// Create New Company
module.exports.createNewCompany = async (company_name, company_address, year_founded) => {

    const company = new Company (null, company_name, company_address, year_founded, null, null, false)
  
    try {

        const result = await databaseQuery(`INSERT INTO companies (company_name, company_address, year_founded, created_at, modified_at, archived) VALUES ('${company_name}', '${company_address}', ${year_founded}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)`)

        return {
            result: JSON.stringify(result),
            statusCode: 200
        }
    } catch (error){
        return {
            result: JSON.stringify({ message: error }),
            statusCode: 500
        }
    }

}
