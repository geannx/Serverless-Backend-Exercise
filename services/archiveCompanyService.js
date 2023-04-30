const databaseQuery = require("../middlewares/databaseQuery").databaseQuery

module.exports.archiveCompanyService = async (company_id) => {
  
    try {    

      const company = await databaseQuery(`SELECT company_name FROM companies WHERE company_id = ${company_id}`);
      const company_name = company.rows[0].company_name;
  
      await Promise.all([
        databaseQuery(`UPDATE companies SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE company_id = ${company_id}`),
        databaseQuery(`UPDATE team SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE company = '${company_name}'`),
        databaseQuery(`UPDATE employees SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE team = (SELECT team_name FROM team WHERE company = '${company_name}')`)
      ]);
      
      return {

        result: null,
        statusCode: 200

      }

    } catch (error){

        return {

          body: JSON.stringify({ message: error }),
          statusCode: 400
          
        }

      }
  }