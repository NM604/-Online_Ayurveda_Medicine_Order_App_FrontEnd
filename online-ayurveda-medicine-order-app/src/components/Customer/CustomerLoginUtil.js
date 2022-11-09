import React, { useState, useEffect } from "react";
import "../../CSS/login.css";
import backendAPI from "../../apis/backendAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { save } from "../../store/cred";
import CustomerUpdateUtil from "./CustomerUpdateUtil";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Collapse from "react-bootstrap/Collapse";

function CustomerLoginUtil() {
  const initialValues = {
    customerId: 0,
    customerName: "",
    customerPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, setResponse] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  const id = useSelector((state) => state.userId);

  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInfo === "1") {
      dispatch(authActions.login());
      const storedUserId = localStorage.getItem("loggedId");
      dispatch(save(storedUserId));
      navigate("/welcome");
    }
  }, [response]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    backendValidate();
    setIsSubmit(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    registerCustomer();
    setIsSubmit(true);
  };

  const registerCustomer = async () => {
    const data = await backendAPI
      .post("/oam/userinterface/customers", formValues)
      .then((response) => {
        setResponse(response.data);
        dispatch(authActions.login());
        dispatch(save(formValues.id));
        navigate("/welcome");
      })
      .catch((error) => {
        setResponse(error.response.data.errorMessage);
      });
  };

  const backendValidate = async () => {
    const data = await backendAPI
      .post("/oam/userinterface/customers/validate", formValues)
      .then((response) => {
        setResponse(response.data);
        dispatch(authActions.login());
        dispatch(save(formValues.id));
        navigate("/welcome");
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
        Login or Signup <Badge bg="success">Customer</Badge>
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
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">{response}</div>
        ) : (
          <pre>{response}</pre>
        )}
      </Form.Group>
      <div className="buttons">
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className="buttons">
        <Button variant="secondary" onClick={handleClick}>
          Sign Up!
        </Button>
      </div>
      <div className="buttons">
        <Button
          variant="warning"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Forgot password
        </Button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <CustomerUpdateUtil />
        </div>
      </Collapse>
    </Form>
  );
}

export default CustomerLoginUtil;
