//Required Dependencies for functionality
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "Thatsmydawg69!",
    database: "COMPANY_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection as id:" + connection.threadId);
    start();
  });

  const viewOptions = [
    "View Departments",
    "View Roles",
    "View Employees",
    "Update Employee",
    "Delete Employee",
    "Add Employee",
    "Add Department",
    "Add Role",
    "Delete Role",
    "Delete Department",
    "Exit"
  ];
  
  function start() {
    inquirer
      .prompt({
        name: "Start",
        type: "list",
        message: "What would you like to do?",
        choices: viewOptions
      })
      .then(function(answer) {
        switch (answer.Start) {
          case viewOptions[0]:
            viewDepartments();
            break;
          case viewOptions[1]:
            viewRoles();
            break;
          case viewOptions[2]:
            viewEmployees();
            break;
          case viewOptions[3]:
            updateEmployee();
            break;
          case viewOptions[4]:
            deleteEmployee();
            break;
          case viewOptions[5]:
            addEmployee();
            break;
          case viewOptions[6]:
            addDepartment();
            break;
          case viewOptions[7]:
            addRole();
            break;
          case viewOptions[8]:
            deleteRole();
            break;
          case viewOptions[9]:
            deleteDepartment();
            break;
          case viewOptions[10]:
            console.log("Goodbye!");
            connection.end();
            break;
        }
      });
  
    function viewDepartments() {
      let sql = "SELECT * FROM department";
      connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    }
  
    function viewRoles() {
      let sql = "SELECT * FROM role";
      connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    }
  
    function viewEmployees() {
      let sql =
        "SELECT id, first_name, last_name, role_id, manager_id FROM employee ";
      connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    }
  
    function updateEmployee() {
      function update() {
        connection.query("SELECT * FROM employee", function(err, res) {
          console.log(res);
          var employeeList = [];
          for (var i = 0; i < res.length; i++) {
            employeeList.push(res[i].first_name);
          }
          inquirer
            .prompt([
              {
                name: "update",
                type: "list",
                message: "Which employee do you want to update?",
                choices: employeeList
              },
              {
                name: "updateOptions",
                type: "list",
                message: "What would you like to update?",
                choices: ["Role", "Manager"]
              }
            ])
            .then(function(answer) {
              connection.query("SELECT * FROM role", function(err, resRole) {
                console.log(resRole);
                var roleList = [];
                for (var i = 0; i < resRole.length; i++) {
                  roleList.push(resRole[i].title);
                }
                inquirer
                  .prompt({
                    name: "roleUpdate",
                    type: "list",
                    message: "what is the new role",
                    choices: roleList
                  })
                  .then(function(roleAnswer) {
                    console.log(roleAnswer);
  
                    var roleID;
                    var empID;
  
                    for (var i = 0; i < res.length; i++) {
                      if (answer.update === res[i].first_name) {
                        empID = res[i].first_name;
                        console.log(empID);
                      }
                    }
  
                    for (var i = 0; i < resRole.length; i++) {
                      if (roleAnswer.roleUpdate === resRole[i].title) {
                        roleID = resRole[i].id;
                        console.log(roleID);
                      }
                      connection.query(
                        "UPDATE employee SET role_id = ? WHERE first_name = ?",
                        [roleID, empID],
                        function(err, res) {
                          console.log(res);
                          // start();
                        }
                      );
                    }
                  });
              });
              // console.log(answer);
            });
        });
      }
  
      update();
    }
  
    function deleteEmployee() {
      connection.query("SELECT * FROM employee", function(err, res) {
        console.log(err, res);
        var employeeList = [];
        for (var i = 0; i < res.length; i++) {
          employeeList.push(res[i].first_name);
        }
        inquirer
          .prompt({
            name: "deletedEmployee",
            type: "list",
            message: "Which employee would you like to remove?",
            choices: employeeList
          })
          .then(function(response) {
            console.log(response);
            var deleteID;
            for (var i = 0; i < res.length; i++) {
              if (response.deletedEmployee === res[i].first_name) {
                deleteID = res[i].id;
              }
            }
            connection.query(
              `DELETE FROM employee where id = ${deleteID}`,
              function(err, res) {
                console.log(err, res);
                start();
              }
            );
          });
      });
    }
  
    function deleteRole() {
      connection.query("SELECT * FROM role", function(err, res) {
        console.log(err, res);
        var roleList = [];
        for (var i = 0; i < res.length; i++) {
          roleList.push(res[i].title);
        }
        inquirer
          .prompt({
            name: "deletedRole",
            type: "list",
            message: "Which Role would you like to remove?",
            choices: roleList
          })
          .then(function(response) {
            console.log(response);
            var deleteRole;
            for (var i = 0; i < res.length; i++) {
              if (response.deletedRole === res[i].title) {
                deleteRole = res[i].id;
              }
            }
            connection.query(
              `DELETE FROM role where id = ${deleteRole}`,
              function(err, res) {
                console.log(err, res);
                start();
              }
            );
          });
      });
    }
  
    function addEmployee() {
      connection.query("SELECT * FROM role", function(err, res) {
        console.log(err, res);
        var selectRole = [];
        for (var i = 0; i < res.length; i++) {
          selectRole.push(res[i].title);
        }
        inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "What's your employees' first name?"
            },
            {
              name: "lastName",
              type: "input",
              message: "What's your employees' last name?"
            },
            {
              name: "employeeRole",
              type: "list",
              message: "What is this employees' role?",
              choices: selectRole
            }
          ])
          .then(function(answer) {
            console.log(answer);
            var roleid;
            for (var i = 0; i < res.length; i++) {
              if (answer.employeeRole === res[i].title) {
                roleid = res[i].id;
              }
            }
            connection.query(
              "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",
              [answer.firstName, answer.lastName, roleid, 1],
              function(err, res) {
                start();
              }
            );
          });
      });
    }
  }
  
  function addRole() {
  
    connection.query("SELECT * FROM department", function(error, result) {
      console.table(error, result);
      let selectDepartment = [];
      for (var i = 0; i < result.length; i++) {
        selectDepartment.push(result[i].name);
      }
      inquirer
        .prompt([
          {
            name: "newRole",
            type: "input",
            message: "What is the title of this new Role?"
          },
          {
            name: "newSalary",
            type: "input",
            message: "What is the salary in this role?"
          },
          {
            name: "roleInDepartment",
            type: "list",
            message: "What department is this role in?",
            choices: selectDepartment
          }
        ])
        .then(function(answer) {
          console.log(answer);
          var empRole;
          for (var i = 0; i < result.length; i++) {
            if (answer.roleInDepartment === result[i].name) {
              empRole = result[i].id;
              console.log(empRole);
            }
          }
          connection.query(
            "INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)",
            [answer.newRole, answer.newSalary, empRole],
            function(err, res) {
              // console.table(err, res);
              start();
            }
          );
        });
    });
  }
  
  function addDepartment() {
    connection.query("SELECT * FROM department", function(err, res) {
      console.table(err, res);
      let selectDepartment = [];
      for (var i = 0; i < res.length; i++) {
        selectDepartment.push(res[i].name);
      }
  
      inquirer
        .prompt([
          {
            name: "newDepartment",
            type: "input",
            message: "What is the name of this new Department?"
          }
        ])
        .then(function(answer) {
          console.log(answer);
          connection.query(
            "INSERT INTO department (name) VALUES (?)",
            [answer.newDepartment],
            function(error, result) {
              // console.log(error, result)
              start();
            }
          );
        });
    });
  }
  
  function deleteDepartment() {
    connection.query("SELECT * FROM department", function(err, res) {
      console.log(err, res);
      var departmentList = [];
      for (var i = 0; i < res.length; i++) {
        departmentList.push(res[i].name);
      }
      inquirer
        .prompt({
          name: "deletedDepartment",
          type: "list",
          message: "Which Department would you like to remove?",
          choices: departmentList
        })
        .then(function(response) {
          console.log(response);
          var delDepartment;
          for (var i = 0; i < res.length; i++) {
            if (response.deletedDepartment === res[i].name) {
              delDepartment = res[i].id;
            }
          }
          connection.query(
            `DELETE FROM department where id = ${delDepartment}`,
            function(err, res) {
              console.log(err, res);
              start();
            }
          );
        });
    });
  }