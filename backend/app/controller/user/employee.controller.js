import employee from "../../service/employee";

class EmployeeController {
  async addEmployee(req, res) {
    try {
      const payload = req.body;
      await employee.addEmployee(payload);
      res.status(201).json({ message: "Employee added successfully." });
    } catch (error) {
      console.log("Error:", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async updateEmployee(req, res) {
    try {
      const employeeId = req.params.id;
      const payload = req.body;
      await employee.updateEmployee(employeeId, payload);
      res.status(200).json({ message: "Employee updated successfully." });
    } catch (error) {
      console.log("Error:", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const employeeId = req.params.id;

      // Check if the employee exists before attempting to delete
      const employeeExists = await employee.getByCondition({
        id: employeeId,
      });
      if (!employeeExists?.length) {
        return res.status(404).json({ message: "Employee not found." });
      }
      await employee.deleteEmployee(employeeId);

      res.status(204).json({ message: "Employee deleted successfully." });
    } catch (error) {
      console.log("Error:", error.message);
      res
        .status(500)
        .json({ message: "Error occurred while deleting an employee." });
    }
  }

  async getEmployee(req, res) {
    try {
      const employeeId = req.params.id;
      const employeeExists = await employee.getByCondition({
        id: employeeId,
      });
      if (!employeeExists?.length) {
        return res
          .status(404)
          .json({ message: "Employee not found.", employee: {} });
      }

      res.status(200).json({
        message: "Employee found.",
        employee: employeeExists[0],
      });
    } catch (error) {
      console.log("Error:", error.message);
      res
        .status(500)
        .json({ message: "Error occurred while getting an employee." });
    }
  }

  async getEmployees(req, res) {
    try {
      const { page, limit, search, sortField, sortOrder } = req.query;

      const parsedSearch = search || "";
      console.log("parsedSearch", "nirmal");

      const result = await employee.getEmployees({
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        search: parsedSearch,
        sortField: sortField || "id",
        sortOrder: sortOrder || "asc",
      });

      res.status(200).json(result);
    } catch (error) {
      console.log("Error:", error.message);
      res
        .status(500)
        .json({ message: "Error occurred while fetching employee data." });
    }
  }
}

export default EmployeeController;
