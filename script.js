document.addEventListener('DOMContentLoaded', () => { //to load the JS file without waiting

  //for employee table

  const employeeForm = document.getElementById('employee-form'); // got access to employee form
  const employeeTable = document.getElementById('employee-table').getElementsByTagName('tbody')[0]; //got access where the rows are to added

  const asignTO = document.getElementById('asignTo');

  const empData = []; //created a null array to store tempData i/p

  employeeForm.addEventListener('submit', (event) => { //added event submit to the button
    event.preventDefault(); // Prevent the form from submitting the traditional way


    const id = document.getElementById('employee-id').value;
    const name = document.getElementById('employee-name').value; //collected the value from all
    const role = document.getElementById('employee-department').value;

    const deleteButton = document.createElement('button');

    // Store values in an array
    empData.push({
      id,
      name,
      role,
      deleteButton
    }); //pushed into the array


    // Update the table
    updateEmp(); //called function

    if (name) { //this is for dynamic option in asign to
      // Create a new option element
      const newOption = document.createElement('option');
      newOption.value = name;
      newOption.textContent = name;

      // Add the new option to the select element
      asignTO.appendChild(newOption);
    }

  });


  function updateEmp() { //funct for inserting table el with arrempData
    // Clear the current table body
    employeeTable.innerHTML = ''; //table body inner html


    // Populate the table with nempData
    empData.forEach((entry) => { //for each empData array

      var deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';

      const row = employeeTable.insertRow(); // insert row function to insert the new row
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1); // created the cells using insert cell function
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      cell1.textContent = entry.id;
      cell2.textContent = entry.name; //add text to cell using entry aempData el
      cell3.textContent = entry.role;
      cell4.appendChild(deleteButton);

      deleteButton.onclick = function () {
        deleteRow(row);
      };

      // const deleteBtn = document.getElementsByTagName('td').getElementsByTagName('button');

    });


  }


  //for task table

  const taskForm = document.getElementById('task-form');
  const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];
  const taskData = [];

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const name = document.getElementById('employee-name').value;
    const priority = document.getElementById('priority').value;


    const deleteButton = document.createElement('button');


    taskData.push({
      title,
      description,
      name,
      priority,
      deleteButton
    });

    updateTask();
  });

  function updateTask() {

    taskTable.innerHTML = '';

    taskData.forEach((entry) => {

      var deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';

      const row = taskTable.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);

      cell1.textContent = entry.name;
      cell2.textContent = entry.title;
      cell3.textContent = entry.description;
      cell4.textContent = entry.priority;
      // console.log(deleteButton);

      cell5.appendChild(deleteButton);

      deleteButton.onclick = function () {
        deleteRow(row);
      };
    });
  }

  //adding dynamic options in assign to

  // const employeeForm = document.getElementById('employee-form');

  function deleteRow(row) {
    row.parentNode.removeChild(row);
  }



  $(document).ready(function() {
    $.ajax({
        url: "https://petstore-demo.apidog.com/pet/findByStatus?status=available", // Specify the status
        method: "GET",
        dataType: "json", // Ensure the dataType is json
        success: function(data) {
            var tableBody = $("#employee-table tbody");
            tableBody.empty();

            data.forEach(function(pet) {
                var row = "<tr>" +
                    "<td>" + pet.id + "</td>" +
                    "<td>" + pet.name + "</td>" +
                    "<td>" + pet.status + "</td>" +
                    "</tr>";
                tableBody.append(row);
            });
        },
        error: function(xhr, status, error) {
            console.error("There was an error with the AJAX request", error);
            alert("Failed to retrieve data. Please try again later.");
        }
    });
});



})