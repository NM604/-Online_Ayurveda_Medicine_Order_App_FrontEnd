import React, { useState, useEffect } from "react";
import backendAPI from "../../apis/backendAPI";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

function CustomerUpdateUtil() {
  const initialValues = {
    customerId: 0,
    customerName: "",
    customerPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [response, setResponse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    updateCustomer();
  };

  const updateCustomer = async () => {
    console.log(formValues);
    const data = await backendAPI
      .put(`/oam/userinterface/customers/${formValues.customerId}`, formValues)
      .then((response) => {
        setResponse(response.data);
        window.location.reload(false);
      })
      .catch((error) => {
        setResponse(error.response.data.errorMessage);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.customerId) {
      errors.customerId = "ID is required!";
    }
    if (!values.customerName) {
      errors.customerName = "Email is required!";
    }
    if (!values.customerPassword) {
      errors.customerPassword = "Password is required";
    } else if (values.customerPassword.length < 4) {
      errors.customerPassword = "Password must be more than 4 characters";
    } else if (values.customerPassword.length > 10) {
      errors.customerPassword =
        "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <Form>
      <h2>
        Change Password <Badge bg="success">Customer</Badge>
      </h2>
      <Form.Group className="mb-3" controlId="customerId">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control
          type="number"
          name="customerId"
          placeholder="Enter ID"
          value={formValues.customerId}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">{formErrors.customerId}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="customerName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="customerName"
          placeholder="Enter username"
          value={formValues.customerName}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">{formErrors.customerName}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="customerPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="customerPassword"
          placeholder="Enter password"
          value={formValues.customerPassword}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          {formErrors.customerPassword}
        </Form.Text>
      </Form.Group>
      <div className="buttons-update">
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </Form>
  );
}

export default CustomerUpdateUtil;
