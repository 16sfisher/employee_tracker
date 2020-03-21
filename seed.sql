DROP DATABASE IF EXISTS COMPANY_DB;
CREATE DATABASE COMPANY_DB;

USE COMPANY_DB;
CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(30) NOT NULL
 );

 CREATE TABLE role(
 id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
 title VARCHAR(50) NOT NULL,
 salary DECIMAL(7,2) NOT NULL,
 department_id INTEGER NOT NULL
 );

 CREATE TABLE employee(
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (50) NOT NULL,
 role_id INT NOT NULL,
 CONSTRAINT  fk_role_id FOREIGN KEY (role_id) REFERENCES role(id),
 manager_id integer 
 );
 INSERT INTO department (name)
 VALUES 
 	("Sales"),
 	("Engineering"), 
 	("Finance"), 
  ("Legal"), 
  ("Manager");

 INSERT INTO role (title, salary, department_id)
 VALUES 
 	("Junior Salesperson", 45000, 1),
 	("Senior Salesperson", 65000, 1), 
	("Junior Engineer", 50000, 2), 
 	("Senior Engineer", 75000, 2),
 	("Accountant", 85000, 3),
 	("Head of Accounting", 90000, 3), 
 	("Attorney", 95000, 4), 
 	("Manager", 75000, 5);

 INSERT INTO employee (first_name, last_name, role_id)
 VALUES 
 	("Sawyer", "Fisher", 3), 
 	("Miranda", "Miller", 4), 
 	("Bennie", "Rellim", 5), 
  ("Missy", "Neb", 6), 
  ("Judy", "Pearce", 7), 
  ("Leighton", "Hughes",8); 