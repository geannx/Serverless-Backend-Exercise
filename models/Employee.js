class Employee {
    constructor (employee_id, employee_name, company_title, year_hired, birthdate, salary, image, team, created_at, modified_at, archived) {
        this.employee_id = employee_id
        this.employee_name = employee_name
        this.company_title = company_title
        this.year_hired = year_hired
        this.birthdate = birthdate
        this.salary = salary
        this.image = image,
        this.team = team
        this.created_at = created_at
        this.modified_at = modified_at
        this.archived = archived
    }

    get getEmployeeId() {
        return this.employee_id
    }

    get getEmployeeName() {
        return this.employee_name
    }

    get getCompanyTitle() {
        return this.company_title
    }

    get getYearHired() {
        return this.year_hired
    }

    get getBirthdate() {
        return this.birthdate
    }

    get getSalary() {
        return this.salary
    }

    get getImage() {
        return this.image
    }

    get getTeam() {
        return this.team
    }

    get getCreatedAt() {
        return this.created_at
    }

    get getModifiedAt() {
        return this.modified_at
    }

    get getArchived() {
        return this.archived
    }

    set setEmployeeName(employee_name) {
        this.employee_name = employee_name
    }

    set setCompanyTitle(company_title) {
        this.company_title = company_title
    }

    set setYearHired(year_hired) {
        this.year_hired = year_hired
    }

    set setBirthdate(birthdate) {
        this.birthdate = birthdate
    }

    set setSalary(salary) {
        this.salary = salary
    }

    set setImage(image) {
        this.image = image
    }

    set setTeam(team) {
        this.team = team
    }

    set setModifiedAt(modified_at) {
        this.modified_at = modified_at
    }

    set setArchived(archived) {
        this.archived = archived
    }
}

module.exports = Employee