import React, { useState, useEffect } from "react";
import "../../CSS/login.css";
import backendAPI from "../../apis/backendAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

function AdminLogin() {
  const initialValues = { id: 0, password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (auth) {
      navigate("/admin");
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
    registerAdmin();
    dispatch(authActions.login());
    setIsSubmit(true);
  };

  const registerAdmin = async () => {
    const data = await backendAPI
      .post("/oam/administrator/admin", formValues)
      .then((response) => {
        setResponse(response.data);
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
        navigate("/admin");
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
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">{response}</div>
      ) : (
        <pre>{response}</pre>
      )}

      <form>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>ID</label>
            <input
              type="number"
              name="id"
              placeholder="id"
              value={formValues.id}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.id}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="field">
          <p>Forgot password</p>
          <button className="fluid ui button blue" onClick={handleClick}>
            Sign Up as Admin
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
