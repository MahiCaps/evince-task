const apiUrl = "http://localhost:5005/api/employee";

const EmployeeService = {
  getEmployees: async (search, sortField, sortOrder, page) => {
    const apiUrl = `http://localhost:5005/api/employee?search=${search}&sortField=${sortField}&sortOrder=${sortOrder}&page=${page}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch employees.");
    }

    return response.json();
  },

  addEmployee: async (employeeData) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to add employee.");
    }

    return response.json();
  },

  deleteEmployee: async (employeeId) => {
    const response = await fetch(`${apiUrl}/${employeeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete employee.");
    }

    return true;
  },

  updateEmployee: async (employeeId, employeeData) => {
    const response = await fetch(`${apiUrl}/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to update employee.");
    }

    return response.json();
  },
};

export default EmployeeService;
