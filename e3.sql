CREATE TABLE companies(
	company_id SERIAL,
	company_name varchar(30) UNIQUE,
	company_address varchar(50),
	year_founded int,
	created_at timestamp,
	modified_at timestamp,
	archived bool,
	PRIMARY KEY (company_id)
);

CREATE TABLE team(
	team_id SERIAL,
	team_name varchar(30) UNIQUE,
	team_leader varchar(30),
	company varchar(30),
	FOREIGN KEY (company) REFERENCES companies(company_name),
	created_at timestamp,
	modified_at timestamp,
	archived bool,
	PRIMARY KEY(team_id, team_name)
);

alter table team
drop constraint company_fkey,
add constraint company_fkey
   foreign key (company_name)
   references companies(company_name)
   on update cascade on delete cascade;

CREATE TABLE employees(
	employee_id SERIAL,
	employee_name varchar(30),
	company_title varchar(30),
	year_hired int,
	birthdate date,
	salary int,
	image varchar(50),
	team varchar(30),
	created_at timestamp,
	modified_at timestamp,
	archived bool,
	PRIMARY KEY (employee_id),
	FOREIGN KEY (team) REFERENCES team(team_name)
);

alter table employees
drop constraint employees_team_fkey,
add constraint employees_team_fkey
   foreign key (team)
   references team(team_name)
   on update cascade on delete cascade;

-- Data for companies
INSERT INTO companies (company_name, company_address, year_founded, created_at, modified_at, archived) VALUES ('ABC Company', 'Metro Manila', 1944, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO companies (company_name, company_address, year_founded, created_at, modified_at, archived) VALUES ('Know-it Company', 'Makati', 1980, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO companies (company_name, company_address, year_founded, created_at, modified_at, archived) VALUES ('XYZ Company', 'Laguna', 1972, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO companies (company_name, company_address, year_founded, created_at, modified_at, archived) VALUES ('Post-it', 'Paranque', 2011, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Data for team table
INSERT INTO team (team_name, team_leader, company, created_at, modified_at, archived) VALUES ('Team-ba', 'Noel C. Buan', 'ABC Company', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO team (team_name, team_leader, company, created_at, modified_at, archived) VALUES ('Blue Team', 'Vincent P. Castro', 'Know-it Company', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO team (team_name, team_leader, company, created_at, modified_at, archived) VALUES ('Green Team', 'Jemmalyn A. Leon', 'XYZ Company', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO team (team_name, team_leader, company, created_at, modified_at, archived) VALUES ('AFAM Team', 'Christine C. Sebastian', 'Post-it', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Data for employee table
INSERT INTO employees (employee_name, company_title, year_hired, birthdate, salary, image, team, created_at, modified_at, archived)VALUES ('Noel C. Buan', 'Team Leader', 2019, '1992-04-07', 75000, '', 'Team-ba', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO employees (employee_name, company_title, year_hired, birthdate, salary, image, team, created_at, modified_at, archived) VALUES ('Vincent P. Castro', 'Team Leader', 2019, '1992-04-07', 83000, '', 'Blue Team', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO employees (employee_name, company_title, year_hired, birthdate, salary, image, team, created_at, modified_at, archived) VALUES ('Jemmalyn A. Leon', 'Team Leader', 2019, '1992-04-07', 83000, '', 'Green Team', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
INSERT INTO employees (employee_name, company_title, year_hired, birthdate, salary, image, team, created_at, modified_at, archived) VALUES ('Christine C. Sebastian', 'Team Leader', 2019, '1992-04-07', 83000, '', 'AFAM Team', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

