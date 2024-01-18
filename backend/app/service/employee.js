import db from "../config/database";

class EmployeeService {
  constructor() {}

  async addEmployee(employeeData) {
    try {
      const emailExists = await this.getByCondition({
        email: employeeData.email,
      });
      if (emailExists.length > 0) {
        throw new Error("Email already exists.");
      }

      const employeeIdExists = await this.getByCondition({
        employeeId: employeeData.employeeId,
      });
      if (employeeIdExists.length > 0) {
        throw new Error("Employee ID already exists.");
      }

      const result = await db("employee").insert(employeeData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(employeeId, employeeData) {
    try {
      const checkEmployee = await this.getByCondition({
        id: employeeId,
      });

      if (!checkEmployee?.length) {
        throw new Error("Employee not found.");
      }
      const emailExists = await this.getByCondition({
        email: employeeData.email,
        id: { not: employeeId },
      });
      if (emailExists?.length) {
        throw new Error("Email already exists.");
      }

      const employeeIdExists = await this.getByCondition({
        employeeId: employeeData.employeeId,
        id: { not: employeeId },
      });
      if (employeeIdExists?.length) {
        throw new Error("Employee ID already exists.");
      }

      const result = await db("employee")
        .where({ id: employeeId })
        .update(employeeData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getByCondition(condition) {
    try {
      const query = db("employee");
      if (condition.id && condition.id.not) {
        query.where("id", "!=", condition.id.not);
        delete condition.id;
      }
      const result = await query.select().where(condition).limit(1);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(employeeId) {
    try {
      const result = await db("employee").where({ id: employeeId }).del();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getEmployees({
    page = 1,
    limit = 10,
    search = "",
    sortField = "id",
    sortOrder = "asc",
  }) {
    try {
      const query = db("employee");

      if (search) {
        query.where((builder) => {
          const searchValue = `%${search}%`;

          builder.orWhere((subBuilder) => {
            subBuilder
              .orWhere("name", "like", searchValue)
              .orWhere("email", "like", searchValue)
              .orWhere("employeeId", "like", searchValue)
              .orWhere("gender", "like", searchValue)
              .orWhere("age", "like", searchValue)
              .orWhere("mobileNumber", "like", searchValue)
              .orWhere("anotherMobileNumber", "like", searchValue);
          });
        });
      }

      query.orderBy(sortField, sortOrder);

      const offset = (page - 1) * limit;
      query.offset(offset).limit(limit);

      const results = await query.select();

      const totalCount = await db("employee").count("id as count").first();
      const totalRecords = totalCount.count;

      return {
        results,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalRecords / limit),
          totalRecords,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new EmployeeService();
