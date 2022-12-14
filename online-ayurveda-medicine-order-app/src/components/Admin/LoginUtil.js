import React, { useState, useEffect } from "react";
import backendAPI from "../../apis/backendAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { save } from "../../store/cred";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Collapse from "react-bootstrap/Collapse";
import UpdateUtil from "./UpdateUtil";
import { userActions } from "../../store/user";
import classes from "./LoginUtil.module.css";

function LoginUtil() {
  const initialValues = { id: null, password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, setResponse] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  const id = useSelector((state) => state.userId);
  const user = useSelector((state) => state.type);

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
    if (formErrors.flag === false) {
      backendValidate();
    }
    setIsSubmit(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (formErrors.flag === false) {
      registerAdmin();
    }
    setIsSubmit(true);
  };

  const registerAdmin = async () => {
    const data = await backendAPI
      .post("/oam/administrator/admin", formValues)
      .then((response) => {
        setResponse(response.data);
        const newId = response.data;
        dispatch(authActions.login());
        dispatch(save(newId.slice(37)));
        dispatch(userActions.login("admin"));
        navigate("/admin");
      })
      .catch((error) => {
        setResponse(error.response.data.errorMessage);
      });
  };

  const backendValidate = async () => {
    const data = await backendAPI
      .post("/oam/administrator/adminvalidate", formValues)
      .then((response) => {
        setResponse(response.data);
        dispatch(authActions.login());
        dispatch(save(formValues.id));
        dispatch(userActions.login("admin"));
        navigate("/admin");
      })
      .catch((error) => {
        setResponse(error.response.data.errorMessage);
      });
  };

  const validate = (values) => {
    const errors = {};
    errors.flag = false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.id) {
      errors.id = "ID is required!";
      errors.flag = true;
    }
    if (!values.password) {
      errors.password = "Password is required";
      errors.flag = true;
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
      errors.flag = true;
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
      errors.flag = true;
    }
    return errors;
  };

  return (
    <Form data-testid="admin-login-form">
      <h2 data-testid="admin-header-1">
        Login or Signup <Badge bg="success">Admin</Badge>
      </h2>
      <Form.Group className="mb-3" controlId="id">
        <Form.Label>AdminID</Form.Label>
        <Form.Control
          type="number"
          name="id"
          placeholder="Enter ID"
          value={formValues.id}
          onChange={handleChange}
          aria-label="id-input-field"
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
          data-testid="admin-login-form-password-field"
        />
        <Form.Text className="text-muted">{formErrors.password}</Form.Text>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">{response}</div>
        ) : (
          <pre>{response}</pre>
        )}
      </Form.Group>
      <div className={classes["buttons"]}>
        <Button
          variant="primary"
          aria-label="submit-button"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <div className={classes["buttons"]}>
        <Button
          variant="secondary"
          aria-label="register-button"
          onClick={handleClick}
        >
          Sign Up as Admin
        </Button>
      </div>
      <div className={classes["buttons"]}>
        <Button
          variant="warning"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          aria-label="update-button"
        >
          Forgot password
        </Button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text" data-testid="update-form">
          <UpdateUtil />
        </div>
      </Collapse>
    </Form>
  );
}

export default LoginUtil;
