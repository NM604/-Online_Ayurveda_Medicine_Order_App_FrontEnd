import React, { useState, useEffect } from "react";
import "../../CSS/login.css";
import backendAPI from "../../apis/backendAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

function CustomerLogin() {
  const initialValues = {
    customerId: 0,
    customerName: "",
    customerPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (auth) {
      navigate("/customer");
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
    dispatch(authActions.login());
    setIsSubmit(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    registerCustomer();
    dispatch(authActions.login());
    setIsSubmit(true);
  };

  const registerCustomer = async () => {
    const data = await backendAPI
      .post("/oam/userinterface/customers", formValues)
      .then((response) => {
        setResponse(response.data);
        navigate("/customer");
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
        navigate("/customer");
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
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">{response}</div>
      ) : (
        <pre>{response}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>ID</label>
            <input
              type="number"
              name="customerId"
              placeholder="customerId"
              value={formValues.customerId}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.customerId}</p>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="customerName"
              placeholder="customerName"
              value={formValues.customerName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.customerName}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="customerPassword"
              placeholder="customerPassword"
              value={formValues.customerPassword}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.customerPassword}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
        <div className="field">
          <p>Forgot password</p>
          <button className="fluid ui button blue" onClick={handleClick}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerLogin;
