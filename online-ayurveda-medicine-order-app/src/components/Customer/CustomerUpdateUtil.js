import React, { useState, useEffect } from "react";
import backendAPI from "../../apis/backendAPI";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import classes from "./CustomerUpdateUtil.module.css";

function CustomerUpdateUtil() {
  const initialValues = {
    customerId: null,
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
    if (formErrors.flag === false) {
      updateCustomer();
    }
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
    errors.flag = false;
    if (!values.customerId) {
      errors.customerId = "ID is required!";
      errors.flag = true;
    }
    if (!values.customerName) {
      errors.customerName = "Username is required!";
      errors.flag = true;
    }
    if (!values.customerPassword) {
      errors.customerPassword = "Password is required!";
      errors.flag = true;
    } else if (values.customerPassword.length < 4) {
      errors.customerPassword = "Password must be more than 4 characters";
      errors.flag = true;
    } else if (values.customerPassword.length > 10) {
      errors.customerPassword =
        "Password cannot exceed more than 10 characters";
      errors.flag = true;
    }
    return errors;
  };

  return (
    <Form data-testid="update-form-2">
      <h2 id="head" data-testid="customer-header-2">
        Change Password <Badge bg="success">Customer</Badge>
      </h2>
      <Form.Group className="mb-3" controlId="customerId">
        <Form.Label id="input">
          <b>Customer ID</b>
        </Form.Label>
        <Form.Control
          type="number"
          name="customerId"
          placeholder="Enter ID"
          value={formValues.customerId}
          onChange={handleChange}
        />
        <Form.Text className="text">
          <b>{formErrors.customerId}</b>
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="customerName">
        <Form.Label id="input">
          <b>Username</b>
        </Form.Label>
        <Form.Control
          type="text"
          name="customerName"
          placeholder="Enter username"
          value={formValues.customerName}
          onChange={handleChange}
        />
        <Form.Text className="text">
          <b>{formErrors.customerName}</b>
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="customerPassword">
        <Form.Label id="input">
          <b>Password</b>
        </Form.Label>
        <Form.Control
          type="password"
          name="customerPassword"
          placeholder="Enter password"
          value={formValues.customerPassword}
          onChange={handleChange}
        />
        <Form.Text className="text">
          <b>{formErrors.customerPassword}</b>
        </Form.Text>
      </Form.Group>
      <div className="buttons-update">
        <Button
          variant="primary"
          aria-label="update-button-2"
          onClick={handleUpdate}
          id="btn"
        >
          Update
        </Button>
      </div>
    </Form>
  );
}

export default CustomerUpdateUtil;
