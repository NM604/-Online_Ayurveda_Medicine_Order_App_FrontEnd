import React, { useState, useEffect } from "react";
import "../../CSS/login.css";
import backendAPI from "../../apis/backendAPI";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

function UpdateUtil() {
  const initialValues = { id: null, password: "" };
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
    updateAdmin();
  };

  const updateAdmin = async () => {
    const data = await backendAPI
      .put(`/oam/administrator/admin/${formValues.id}`, formValues)
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.id) {
      errors.id = "ID is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <Form>
      <h2>
        Change Password <Badge bg="success">Admin</Badge>
      </h2>
      <Form.Group className="mb-3" controlId="id">
        <Form.Label>AdminID</Form.Label>
        <Form.Control
          type="number"
          name="id"
          placeholder="Enter ID"
          value={formValues.id}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">{formErrors.id}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password"
          value={formValues.password}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">{formErrors.password}</Form.Text>
      </Form.Group>
      <div className="buttons-update">
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </Form>
  );
}

export default UpdateUtil;
