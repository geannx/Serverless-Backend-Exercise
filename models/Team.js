class Team {
    constructor(team_id, team_name, team_leader, company, created_at, modified_at, archived) {
        this.team_id = team_id
        this.team_name = team_name
        this.team_leader = team_leader
        this.company = company
        this.created_at = created_at
        this.modified_at = modified_at
        this.archived = archived
    }

    get getTeamId() {
        return this.team_id
    }

    get getTeamName() {
        return this.team_name
    }

    get getTeamLeader() {
        return this.team_leader
    }

    get getCompany() {
        return this.company
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

    set setTeamName(team_name) {
        this.team_name = team_name
    }

    set setTeamLeader(team_leader) {
        this.team_leader = team_leader
    }

    set setCompany(company) {
        this.company = company
    }

    set setModifiedAt(modified_at) {
        this.modified_at = this.modified_at
    }
}

module.exports = Team