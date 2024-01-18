import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const EmployeeForm = ({ mode, initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    mobileNumber: "",
    gender: "",
    age: "",
    anotherMobileNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (mode === "update" && initialValues) {
      setFormData(initialValues);
    }
  }, [mode, initialValues]);

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 128
    ) {
      newErrors.name = "Name must be between 2 and 128 characters.";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (
      !formData.employeeId ||
      !/^[A-Za-z0-9]{10}$/.test(formData.employeeId)
    ) {
      newErrors.employeeId =
        "Employee ID must be alphanumeric and 10 characters long.";
    }

    if (
      !formData.mobileNumber ||
      !/^\+91[6-9]\d{9}$/.test(formData.mobileNumber)
    ) {
      newErrors.mobileNumber =
        "Please enter a valid Indian mobile number starting with +91.";
    }

    if (
      !formData.gender ||
      !["male", "female", "other"].includes(formData.gender)
    ) {
      newErrors.gender = "Please select a valid gender.";
    }

    if (!formData.age || formData.age < 18 || formData.age > 60) {
      newErrors.age = "Age must be between 18 and 60.";
    }

    if (
      formData.anotherMobileNumber &&
      !/^\+91[6-9]\d{9}$/.test(formData.anotherMobileNumber)
    ) {
      newErrors.anotherMobileNumber =
        "Please enter a valid Indian mobile number starting with +91.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {formSubmitted && errors.global && (
        <Alert variant="danger">{errors.global}</Alert>
      )}
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {formSubmitted && errors.name && (
          <small className="text-danger">{errors.name}</small>
        )}
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formSubmitted && errors.email && (
          <small className="text-danger">{errors.email}</small>
        )}
      </Form.Group>

      <Form.Group controlId="employeeId">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter employee ID"
          name="employeeId"
          value={formData.employeeId}
          onChange={(e) =>
            setFormData({ ...formData, employeeId: e.target.value })
          }
        />
        {formSubmitted && errors.employeeId && (
          <small className="text-danger">{errors.employeeId}</small>
        )}
      </Form.Group>

      <Form.Group controlId="mobileNumber">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter mobile number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={(e) =>
            setFormData({ ...formData, mobileNumber: e.target.value })
          }
        />
        {formSubmitted && errors.mobileNumber && (
          <small className="text-danger">{errors.mobileNumber}</small>
        )}
      </Form.Group>

      <Form.Group controlId="gender">
        <Form.Label>Gender</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="Male"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          <Form.Check
            inline
            type="radio"
            label="Female"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          <Form.Check
            inline
            type="radio"
            label="Other"
            name="gender"
            value="other"
            checked={formData.gender === "other"}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
        </div>
        {formSubmitted && errors.gender && (
          <small className="text-danger">{errors.gender}</small>
        )}
      </Form.Group>

      <Form.Group controlId="age">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter age"
          name="age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        {formSubmitted && errors.age && (
          <small className="text-danger">{errors.age}</small>
        )}
      </Form.Group>

      <Form.Group controlId="anotherMobileNumber">
        <Form.Label>Another Mobile Number (Optional)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter another mobile number"
          name="anotherMobileNumber"
          value={formData.anotherMobileNumber}
          onChange={(e) =>
            setFormData({ ...formData, anotherMobileNumber: e.target.value })
          }
        />
        {formSubmitted && errors.anotherMobileNumber && (
          <small className="text-danger">{errors.anotherMobileNumber}</small>
        )}
      </Form.Group>

      <Button variant="primary" type="submit" className="mr-2">
        {mode === "update" ? "Update" : "Add"}
      </Button>
      <Button variant="secondary" className="ml-2" onClick={handleCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default EmployeeForm;
