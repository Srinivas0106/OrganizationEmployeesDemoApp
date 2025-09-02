import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [orgName, setOrgName] = useState("");
  const [empName, setEmpName] = useState("");
  const [empRole, setEmpRole] = useState("");
  const [searchOrg, setSearchOrg] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [employees, setEmployees] = useState([]);

  const addOrganization = async () => {
    const res = await fetch("http://localhost:8080/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: orgName }),
    });
    const data = await res.json();
    alert("Organization saved: " + data.name);
    alert("Organization added");
  };

  const addEmployee = async () => {
    try {
      const orgNameTrimmed = orgName.trim();
      const res = await fetch(
        `http://localhost:8080/employees?name=${empName}&role=${empRole}&email=${empEmail}&orgName=${orgNameTrimmed}`,

        { method: "POST" }
      );

      const text = await res.text();
      alert(text);
      setEmpName("");
      setEmpRole("");
      setEmpEmail("");
      
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

  const fetchEmployees = async () => {
    const res = await fetch(
      `http://localhost:8080/employees/byOrg/${searchOrg}`
    );
    const data = await res.json();

    if (data.length === 0) {
      alert("No employees found for this organization");
    }
    setEmployees(data);
    setSearchOrg("");
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary">
        Organization & Employee App
      </h1>

      {/* Add Organization */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          Add Organization
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Organization Name (required)"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <button
            className="btn btn-success"
            onClick={() => {
              if (!orgName.trim()) {
                alert("Organization name is required");
                return;
              }
              addOrganization();
            }}
          >
            Add Organization
          </button>
        </div>
      </div>

      {/* Add Employee */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-success text-white">Add Employee</div>
        <div className="card-body">
          <div className="mb-3">
            <input
              className="form-control mb-2"
              placeholder="Employee Name (required)"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Role (required)"
              value={empRole}
              onChange={(e) => setEmpRole(e.target.value)}
            />

            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email (required)"
              value={empEmail}
              onChange={(e) => setEmpEmail(e.target.value)}
            />

          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (!empName.trim()) {
                alert("Employee name is required");
                return;
              }
              if (!empRole.trim()) {
                alert("Employee role is required");
                return;
              }
              if (!empEmail.trim()) {
                alert("Employee email is required");
                return;
              }
              addEmployee();
            }}
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Search Employees */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          Get Employees by Organization
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              className="form-control"
              placeholder="Search by Organization (required)"
              value={searchOrg}
              onChange={(e) => setSearchOrg(e.target.value)}
            />
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                if (!searchOrg.trim()) {
                  alert("Organization name is required to fetch employees");
                  return;
                }
                fetchEmployees();
              }}
            >
              Fetch
            </button>
          </div>

          <ul className="list-group">
            {employees.map((emp) => (
              <li key={emp.id} className="list-group-item">
                <strong>{emp.name}</strong> – {emp.role} - {emp.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
