class Employee {
  // Constructor to initialize Employee object
  constructor(name, address, employeeId, designation) {
    this.name = name;
    this.address = address;
    this.employeeId = employeeId;
    this.designation = designation;
  }
}

// Array to store employee objects
let employees = [];

// Get form and list elements by their respective ID
const employeeForm = document.getElementById("employee-form");
const employeeList = document.getElementById("employee-list");
const editBtn = document.getElementById("edit-btn");
const addBtn = document.getElementById("add-btn");

// Hide the Edit button initially
editBtn.style.display = "none";
addBtn.style.display = "block";

// Event listener for form submission
employeeForm.addEventListener("submit", function (e) {
  // Prevent default form submission behavior
  e.preventDefault();

  // Get values from form inputs
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const employeeId = document.getElementById("employee-id").value;
  const designation = document.getElementById("designation").value;

  // Check if all fields are filled
  if (name && address && employeeId && designation) {
    // Create a new Employee object with the provided details
    const employee = new Employee(name, address, employeeId, designation);

    // Add the new employee object to the employees array
    employees.push(employee);

    // Display the updated list of employees
    displayEmployees();

    // Reset the form inputs
    employeeForm.reset();
  } else {
    // If any field is empty, show an alert message
    alert("Please fill in all fields");
  }
});

// Function to display employees in a table
function displayEmployees() {
  // Clear the existing contents of the employee list
  employeeList.innerHTML = "";

  // Loop through each employee object in the employees array
  employees.forEach(function (employee, index) {
    // Create a new table row element
    const row = document.createElement("tr");
    // Set the inner HTML content of the row with employee details and an edit button
    row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.address}</td>
            <td>${employee.employeeId}</td>
            <td>${employee.designation}</td>
            <td><button onclick="editEmployee(${index})">Edit</button></td>
          `;
    // Append the row to the employee list table
    employeeList.appendChild(row);
  });
}

// Function to edit employee details
function editEmployee(index) {
  // Get the employee object at the specified index in the employees array
  const employee = employees[index];

  // Hide the Add button
  editBtn.style.display = "block";
  editBtn.style.backgroundColor = "gray";
  addBtn.style.display = "none";

  // Set the form inputs to the details of the selected employee
  const inputs = employeeForm.querySelectorAll("input");
  inputs[0].value = employee.name;
  inputs[1].value = employee.address;
  inputs[2].value = employee.employeeId;
  inputs[3].value = employee.designation;

  // Add an event listener to the edit button to save the changes when user click save button
  editBtn.onclick = function () {
    // Update the details of the selected employee with the values from the form inputs
    employees[index] = new Employee(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value,
      inputs[3].value
    );

    // Display the updated list of employees
    displayEmployees();

    // Reset the form inputs
    employeeForm.reset();

    // Hide the edit button
    editBtn.style.display = "none";
    addBtn.style.display = "block";
  };
}

// Initially load the employee table in dom
displayEmployees();
