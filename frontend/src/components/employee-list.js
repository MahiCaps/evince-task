import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./common.toast";
import EmployeeForm from "./add-edit-employee";
import EmployeeService from "../services/employee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 1,
  });

  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleAdd = () => {
    setEditEmployee(null);
    setShowModal(true);
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find(
      (employee) => employee.id === employeeId
    );
    setEditEmployee(employeeToEdit);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditEmployee(null);
  };

  const renderAddButton = () => {
    return (
      <Button variant="primary" size="lg" onClick={handleAdd}>
        Add Employee
      </Button>
    );
  };

  useEffect(() => {
    fetchEmployees(search, sortField, sortOrder, pagination.currentPage);
  }, [search, sortField, sortOrder, pagination.currentPage]);

  const fetchEmployees = async (search, sortField, sortOrder, page) => {
    setLoading(true);
    try {
      const data = await EmployeeService.getEmployees(
        search,
        sortField,
        sortOrder,
        page
      );
      setEmployees(data.results);
      setPagination(data?.pagination);
      setError(null);
    } catch (error) {
      window.showErrorToast(error.message || "Failed to add employee.");
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      await EmployeeService.addEmployee(employeeData);
      window.showSuccessToast("Employee added successfully");
      fetchEmployees(search, sortField, sortOrder, pagination.currentPage);
    } catch (error) {
      window.showErrorToast(error.message || "Failed to add employee.");
    }
  };

  const handleDelete = async (employeeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (confirmed) {
      try {
        await EmployeeService.deleteEmployee(employeeId);
        window.showSuccessToast("Employee deleted successfully");
        fetchEmployees(search, sortField, sortOrder, pagination.currentPage);
      } catch (error) {
        window.showErrorToast(error.message || "Failed to delete employee.");
      }
    } else {
      console.log("Delete action canceled.");
    }
  };

  const updateEmployee = async (employeeId, employeeData) => {
    try {
      await EmployeeService.updateEmployee(employeeId, employeeData);
      window.showSuccessToast("Employee updated successfully");
      fetchEmployees(search, sortField, sortOrder, pagination.currentPage);
    } catch (error) {
      window.showErrorToast(error.message || "Failed to update employee.");
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    fetchEmployees(search, field, sortOrder, pagination.currentPage);
  };
  const handlePageChange = (page) => {
    fetchEmployees(search, sortField, sortOrder, page);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= pagination.totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pagination.currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div>
      <h2>List of Employee</h2>

      <div className="mb-3">
        <div className="mb-2">
          <div className="mb-2">{renderAddButton()}</div>
        </div>

        <input
          type="text"
          id="searchInput"
          className="form-control"
          placeholder="Search by column value.."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSortChange("employeeId")}>Employee ID</th>
            <th onClick={() => handleSortChange("name")}>Name</th>
            <th onClick={() => handleSortChange("email")}>Email</th>
            <th onClick={() => handleSortChange("mobileNumber")}>
              PhoneNumber
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4">Error: {error}</td>
            </tr>
          ) : employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No data found.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNumber}</td>
                <td>
                  <div>
                    <Button
                      variant="primary"
                      className="mr-2"
                      onClick={() => handleEdit(employee.id)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {employees?.length > 0 && (
        <div>
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(pagination.totalPages)}
            />
          </Pagination>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editEmployee ? "Edit Employee" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeForm
            mode={editEmployee ? "update" : "add"}
            initialValues={editEmployee}
            onSubmit={(formData) => {
              if (editEmployee) {
                updateEmployee(editEmployee.id, formData);
              } else {
                addEmployee(formData);
              }
              handleCloseModal();
            }}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
      <Toast />
    </div>
  );
};

export default EmployeeList;
