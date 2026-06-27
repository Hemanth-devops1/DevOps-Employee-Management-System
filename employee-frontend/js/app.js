const apiUrl = "http://localhost:8080/employees";
let editingEmployeeId = null;

// Load all employees
function loadEmployees() {

    fetch(apiUrl)

        .then(response => response.json())

        .then(data => {

            const table = document.getElementById("employeeTable");

            table.innerHTML = "";

            data.forEach(employee => {

               table.innerHTML += `
<tr>

    <td>${employee.id}</td>

    <td>${employee.name}</td>

    <td>${employee.email}</td>

    <td>${employee.department}</td>

    <td>${employee.salary}</td>

   <td>

    <button
        class="btn btn-warning btn-sm me-2"
        onclick="editEmployee(${employee.id})">

        Edit

    </button>

    <button
        class="btn btn-danger btn-sm"
        onclick="deleteEmployee(${employee.id})">

        Delete

    </button>

</td>

</tr>
`;

            });

        })

        .catch(error => console.error(error));

}

// Load employees when page opens
loadEmployees();


// Save Employee
document.getElementById("employeeForm").addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const salary = document.getElementById("salary").value;

    if(name === "" || email === "" || department === "" || salary === ""){

        alert("Please fill all fields.");

        return;

    }

    const saveBtn = document.getElementById("saveBtn");

    saveBtn.disabled = true;

    saveBtn.innerText = "Saving...";

    const employee = {

        name: name,

        email: email,

        department: department,

        salary: parseFloat(salary)

    };

    const requestUrl = editingEmployeeId
    ? `${apiUrl}/${editingEmployeeId}`
    : apiUrl;

const requestMethod = editingEmployeeId
    ? "PUT"
    : "POST";

fetch(requestUrl, {

    method: requestMethod,

    headers: {

        "Content-Type":"application/json"

    },

    body: JSON.stringify(employee)

})

    .then(response => {

        if(!response.ok){

            throw new Error("Failed to save employee");

        }

        return response.json();

    })

    .then(() => {

        if(editingEmployeeId){

    alert("Employee Updated Successfully!");

}else{

    alert("Employee Added Successfully!");

}

        editingEmployeeId = null;

document.getElementById("saveBtn").innerText = "Save Employee";
document.getElementById("cancelBtn").style.display = "none";

        loadEmployees();

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong!");

    })

    .finally(() => {

        saveBtn.disabled = false;

        saveBtn.innerText = "Save Employee";

    });

});

function editEmployee(id){

    fetch(`${apiUrl}/${id}`)

    .then(response => response.json())

    .then(employee => {

        document.getElementById("name").value = employee.name;

        document.getElementById("email").value = employee.email;

        document.getElementById("department").value = employee.department;

        document.getElementById("salary").value = employee.salary;

        editingEmployeeId = employee.id;

        document.getElementById("saveBtn").innerText = "Update Employee";

        document.getElementById("cancelBtn").style.display = "inline-block";

    })

    .catch(error => console.error(error));

}

function cancelEdit(){

 document.getElementById("employeeForm").reset();

editingEmployeeId = null;

document.getElementById("saveBtn").innerText = "Save Employee";

document.getElementById("cancelBtn").style.display = "none";

loadEmployees();
}

function deleteEmployee(id){

    if(!confirm("Are you sure you want to delete this employee?")){

        return;

    }

    fetch(`${apiUrl}/${id}`,{

        method:"DELETE"

    })

    .then(response=>{

        if(!response.ok){

            throw new Error("Failed to delete employee");

        }

        return response.text();

    })

    .then(message=>{

        alert(message);

        // Reset form if the deleted employee was being edited
        if(editingEmployeeId === id){

            editingEmployeeId = null;

            document.getElementById("employeeForm").reset();

            document.getElementById("saveBtn").innerText = "Save Employee";

            document.getElementById("cancelBtn").style.display = "none";

        }

        loadEmployees();

    })

    .catch(error=>{

        console.error(error);

        alert("Error deleting employee");

    });

}