const ServerlessClient = require('serverless-postgres');

const client = new ServerlessClient({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "admin123",
    port: 5432,
    debug: true,
    delayMs: 3000,
})

// Get All Companies API
module.exports.getAllCompanies = async (event, context, callback) => {
  await client.connect()

  const { rows } = await client.query(`SELECT * FROM companies WHERE archived = false`)

    await client.clean();

    return {
        statusCode: 200,
        body: JSON.stringify({ result: rows })
    } 
}

//  Get All Companies
module.exports.getAllCompaniesById = async (event, context, callback) => {
  const { company_id } = event.pathParameters

  await client.connect()

  const { rows } = await client.query(`SELECT * FROM companies WHERE archived = false AND company_id = ${company_id}`)

    await client.clean();

    return {
        statusCode: 200,
        body: JSON.stringify({ result: rows })
    } 
}

// Create New Company
module.exports.createCompany = async (event, context, callback) => {

  const { company_name, company_address, year_founded} = JSON.parse(event.body);

  await client.connect()

    try {
        const result = await client.query(`INSERT INTO companies (company_name, company_address, year_founded, created_at, modified_at, archived) VALUES ('${company_name}', '${company_address}', ${year_founded}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)`)
        await client.clean();

        return {
            statusCode: 200,
            body: JSON.stringify({ result: result })
        }
    } catch (error){
        console.error(error);

        return {
            statusCode: 404,
            body: JSON.stringify({ message: error })
        }
    }
}

// Edit Company Details - Edit All Details
module.exports.editCompanyDetails = async (event, context, callback) => {
  const { company_id } = event.pathParameters
  const { company_name, company_address, year_founded } = JSON.parse(event.body)

  await client.connect()
  const result = await client.query(`UPDATE companies SET company_name = '${company_name}', company_address = '${company_address}', year_founded = ${year_founded}, modified_at = CURRENT_TIMESTAMP WHERE company_id = ${company_id}`)
  await client.clean()

  return {
      statusCode: 204 // 204 = No Context yung response body
  }
}

// Archive Company - Should also archive all team and employees
module.exports.archiveCompany = async (event, context, callback) => {
  const { company_id } = event.pathParameters

    await client.connect()
    const archive_companies_tbl = client.query(`UPDATE companies SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE company_id = ${company_id}`)
    const company_result = await client.query(`SELECT company_name FROM companies WHERE company_id = ${company_id}`)
    const company_name = company_result.rows[0].company_name
    const archive_team_tbl = await client.query(`UPDATE team SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE company ='${company_name}'`)
    const team_name_result = await client.query(`SELECT team_name FROM team WHERE company ='${company_name}'`)
    const team_name = team_name_result.rows[0].team_name
    const archive_employees_tbl = await client.query(`UPDATE employees SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE team ='${team_name}'`)

    await client.clean()

    return {
        statusCode: 200
    }
}

// Get All Team by Company
module.exports.getTeamByCompany = async (event, context, callback) => {
  const { company_name } = event.pathParameters

  await client.connect()

  const { rows } = await client.query(`SELECT team_name FROM team WHERE archived = false AND company = '${company_name}'`)

    await client.clean();

    return {
        statusCode: 200,
        body: JSON.stringify({ result: rows })
    } 
}

// Get Team by ID
module.exports.getTeamById = async (event, context, callback) => {
  const { id } = event.pathParameters

  await client.connect()

  const { rows } = await client.query(`SELECT team_name FROM team WHERE archived = false AND team_id = ${id}`)

    await client.clean();

    return {
        statusCode: 200,
        body: JSON.stringify({ result: rows })
    } 
}

// Create Team for Specific Company ID
module.exports.createTeam = async (event, context, callback) => {
  const { id } = event.pathParameters
  const { team_name, team_leader } = JSON.parse(event.body)

  await client.connect()

  const company_result = await client.query(`SELECT company_name FROM companies WHERE company_id = ${id} AND archived = false`)
  const company_name = company_result.rows[0].company_name

    try {
        const result = await client.query(`INSERT INTO team (team_name, team_leader, company, created_at, modified_at, archived) VALUES ('${team_name}', '${team_leader}', '${company_name}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)`)
        await client.clean();

        return {
            statusCode: 200,
            body: JSON.stringify({ result: result })
        }
    } catch (error){
        console.error(error);

        return {
            statusCode: 404,
            body: JSON.stringify({ message: error })
        }
    }
}

// Edit Team Details - Edit All Details
module.exports.editTeam = async (event, context, callback) => {
  const { team_id } = event.pathParameters
  const { team_name, team_leader, company} = JSON.parse(event.body)

  await client.connect()
  const result = await client.query(`UPDATE team SET team_name = '${team_name}', team_leader = '${team_leader}', company = '${company}', modified_at = CURRENT_TIMESTAMP WHERE team_id = ${team_id}`)
  await client.clean()

  return {
      statusCode: 204 // 204 = No Context yung response body
  }
}

// Archive Team - Should also archive all employees
module.exports.archiveTeam = async (event, context, callback) => {
  const { team_id } = event.pathParameters

  await client.connect()

  const archive_teams_tbl = client.query(`UPDATE team SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE team_id = ${team_id}`)
  const team_result = await client.query(`SELECT team_name FROM team WHERE team_id = ${team_id}`)
  const team_name = team_result.rows[0].team_name
  const archive_employees_tbl = await client.query(`UPDATE employees SET archived = true, modified_at = CURRENT_TIMESTAMP WHERE team ='${team_name}'`)

  await client.clean()

  return {
      statusCode: 200
  }
}

// Get All Employee By Company
module.exports.getEmployeeByCompany = async (event, context, callback) => {
  const { company_name } = event.pathParameters

  await client.connect()

  const employees = await client.query(`SELECT employee_name FROM employees WHERE team = (SELECT team_name FROM team WHERE company = '${company_name}' AND archived = false)`)

  await client.clean()

  return {
    statusCode: 200,
    body: JSON.stringify({ result: employees })
  }
}

// Get All Employee By Team
module.exports.getEmployeeByTeam = async (event, context, callback) => {
  const { team_name } = event.pathParameters

  await client.connect()

  const employees = await client.query(`SELECT employee_name FROM employees WHERE team = '${team_name}' AND archived = false)`)

  await client.clean()

  return {
    statusCode: 200,
    body: JSON.stringify({ result: employees })
  }
}

// Get Employee By ID
module.exports.getEmployeeById = async (event, context, callback) => {
  const { id } = event.pathParameters

  await client.connect()

  const employees = await client.query(`SELECT employee_name FROM employees WHERE employee_id = ${id} AND archived = false)`)

  await client.clean()

  return {
    statusCode: 200,
    body: JSON.stringify({ result: employees })
  }
}

// Create Employee
module.exports.createEmployee = async (event, context, callback) => {
  const { emp_name, comp_title, year_hired, birthdate, salary, image, team } = JSON.parse(event.body)

  await client.connect()

  try {
      const result = await client.query(`INSERT INTO employees (employee_name, company_title, year_hired, birthdate, salary, image, team,
        created_at, modified_at, archived) VALUES ('${emp_name}', '${comp_title}', ${year_hired}, '${birthdate}', ${salary}, '${image}', '${team}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)`)
      await client.clean();

      return {
          statusCode: 200,
          body: JSON.stringify({ result: result })
      }
  } catch (error){
      console.error(error);

      return {
          statusCode: 404,
          body: JSON.stringify({ message: error })
      }
  }
}

// Edit Employee Details - Edit All Details
module.exports.editEmployee = async (event, context, callback) => {
  const { emp_id } = event.pathParameters
  const { emp_name, comp_title, year_hired, birthdate, salary, image, team } = JSON.parse(event.body)

  await client.connect()

  try {
      const result = await client.query(`UPDATE employees SET employee_name = '${emp_name}', company_title = '${comp_title}', year_hired = ${year_hired}, birthdate = '${birthdate}', 
      salary = ${salary}, image = '${image}', team = '${team}', modified_at = CURRENT_TIMESTAMP WHERE employee_id = ${emp_id}` )
      await client.clean();

      return {
          statusCode: 200,
          body: JSON.stringify({ result: result })
      }
  } catch (error){
      console.error(error);

      return {
          statusCode: 404,
          body: JSON.stringify({ message: error })
      }
  }
}

// Archive Employee
module.exports.archiveEmployee = async (event, context, callback) => {
  const { emp_id } = event.pathParameters

  await client.connect()

  try {
    const result = await client.query(`UPDATE employees SET modified_at = CURRENT_TIMESTAMP, archived = true WHERE employee_id = ${emp_id}`)
    await client.clean();

    return {
        statusCode: 200,
        body: JSON.stringify({ result: result })
    }
  } catch (error){
      console.error(error);

      return {
          statusCode: 404,
          body: JSON.stringify({ message: error })
      }
  }
}
