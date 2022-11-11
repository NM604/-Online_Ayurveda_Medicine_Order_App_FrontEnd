import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import classes from "./MedicineAdd.module.css";
import Alert from "@mui/material/Alert";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  // Select,
} from "@mui/material";
import { LocalFireDepartment } from "@mui/icons-material";

function MedicineAdd() {
  const [formValues, setFormValues] = useState({
    categoryDTO: { categoryName: "" },
    companyName: "",
    expiryDate: "",
    medicineCost: 0,
    medicineName: "",
    mfd: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [categoryNameList, setCategoryNameList] = useState([{}]);
  const [response, setResponse] = useState();
  const [message, setMessage] = useState("");
  // const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/oam/userinterface/category"
      );
      setCategoryNameList(response.data);
      console.log(response.data);
    } catch (err) {
      setFormErrors(err);
    }
  };

  const onChangeCategory = (e) => {
    const newdata = { ...formValues };
    setFormValues({
      ...formValues,
      categoryDTO: {
        ...formValues.categoryDTO.categoryName,
        [e.target.name]: e.target.value,
      },
    });
    console.log(newdata);
  };
  const handleChange = (e) => {
    const newdata = { ...formValues };
    newdata[e.target.name] = e.target.value;
    setFormValues(newdata);

    console.log(newdata);
  };

  const addmed = async () => {
    try {
      await axios
        .post("http://localhost:8080/oam/userinterface/medicine", {
          categoryDTO: formValues.categoryDTO,
          companyName: formValues.companyName,
          expiryDate: formValues.expiryDate,
          medicineCost: formValues.medicineCost,
          medicineName: formValues.medicineName,
          mfd: formValues.mfd,
        })
        // .then(setMessage("Medicine Added !!!"))
        .catch((error) => {
          setResponse(error.response.data.errorMessage);
          // setMessage("Medicine Added !!!")
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log(formErrors);

    // if (JSON.stringify(formErrors) === JSON.stringify({})){
    addmed();
    console.log("added!!!");

    setIsSubmit(true);
    // if (JSON.stringify(formErrors) === JSON.stringify({})){
    //   setMessage("medine updated succesfully");
    // }
    // <Alert severity="success">("Medicine Added !!!")</Alert>
    // }
    // else{

    // }
    // addmed();
    // console.log("added!!!");
    // alert("Medicine Added !!!")
  };

  const validate = (values) => {
    console.log("validating!!!");
    const errors = {};
    const today = new Date();
    // const regex = [0-9]+;
    if (!values.medicineName) {
      errors.medicineName = "medicine name is required!";
    }
    if (!values.companyName) {
      errors.companyName = "company name is required!";
    }
    if (!values.mfd) {
      errors.mfd = "manufacturing date is required!";
    } else if (values.mfd >= today) {
      errors.mfd = "manufacturing date cannot be future!";
    }

    if (!values.expiryDate) {
      errors.expiryDate = "expiry date is required!";
    } else if (values.expiryDate >= today) {
      errors.expiryDate = "expiry date cannot be in past!";
    }
    if (!values.medicineCost) {
      errors.medicineCost = "medicine cost is required!";
    } else if (values.medicineCost <= 0) {
      errors.medicineCost = "medicine cost should be more than 0!";
    }
    console.log(errors);
    return errors;
  };

  const disableDate = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    mm = today.getMonth + 1;
    dd = today.getDate + 1;
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div>
      {/* MedicineAdd */}

      <div className={classes.formContainer}>
        <Typography gutterBottom variant="h4" align="center">
          Add medicine
          {/* <p>{formErrors.medicineName}</p> */}
        </Typography>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <form>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    {/* <div className="categorySelector">
                    <select className= {classes.category}
                      name="categoryName"
                      value={formValues.categoryDTO.categoryName}
                      onChange={onChangeCategory}
                    >
                      <option value="">Choose Category</option>
                      {categoryNameList.map((category) => (
                        <option
                          value={category.categoryName}
                          key={category.categoryId}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    </div> */}
                  </Grid>
                  <Grid xs={12} sm={8} item>
                    <TextField
                      type="text"
                      name="medicineName"
                      placeholder="Medicine Name"
                      value={formValues.medicineName}
                      onChange={handleChange}
                      label="Medicine Name"
                      variant="outlined"
                      fullWidth
                      // required
                    />
                  </Grid>

                  <Grid xs={9} sm={4} item>
                    <TextField
                      placeholder="Medicine cost"
                      type="number"
                      label="Cost"
                      align="center"
                      value={formValues.medicineCost}
                      name="medicineCost"
                      onChange={handleChange}
                      // margin="dense"
                      variant="outlined"
                      fullWidth
                      // required
                    />
                  </Grid>
                  <Grid xs={12} sm={8} item>
                    <TextField
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      margin="dense"
                      value={formValues.companyName}
                      onChange={handleChange}
                      label="Company Name"
                      variant="outlined"
                      fullWidth
                      // required
                    />
                  </Grid>

                  <Grid xs={9} sm={4} item>
                    <div className="categorySelector">
                      <select
                        className={classes.category}
                        name="categoryName"
                        value={formValues.categoryDTO.categoryName}
                        onChange={onChangeCategory}
                      >
                        <option value="">Category</option>
                        {categoryNameList.map((category) => (
                          <option
                            value={category.categoryName}
                            key={category.categoryId}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="date"
                      name="mfd"
                      placeholder="Manufacturing Date"
                      value={formValues.mfd}
                      onChange={handleChange}
                      variant="outlined"
                      label="Manufacturing Date"
                      max={disableDate}
                      fullWidth
                      // required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-Expiry"
                      type="date"
                      name="expiryDate"
                      placeholder="Expiry Date"
                      value={formValues.expiryDate}
                      onChange={handleChange}
                      variant="outlined"
                      label="Expiry Date"
                      min={disableDate}
                      fullWidth
                      // required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <br />

                {/* <Alert severity="success">Medicine Added !!!</Alert> */}

                <p>{message}</p>
                <p>{formErrors.medicineName}</p>
                <p>{formErrors.medicineCost}</p>
                <p>{formErrors.companyName}</p>
                <p>{formErrors.mfd}</p>
                <p>{formErrors.expiryDate}</p>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <h1>Add medicine</h1>
        <div className="ui divider"></div>
        <div className="field">
          <label>Choose Category</label>
          <select
            name="categoryName"
            value={formValues.categoryDTO.categoryName}
            onChange={onChangeCategory}
          >
            <option value="">Choose Category</option>
            {categoryNameList.map((category) => (
              <option value={category.categoryName} key={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="ui form">
          <div className="field">
            <label>Medicine Name</label>
            <input
              type="text"
              name="medicineName"
              placeholder="Medicine Name"
              value={formValues.medicineName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.medicineName}</p>
          <div className="field">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formValues.companyName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.companyName}</p>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Medicine Cost</label>
            <input
              type="text"
              name="medicineCost"
              placeholder="Medicine Cost"
              value={formValues.medicineCost}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.medicineCost}</p>
          <div className="field">
            <label>Manufacturing Date</label>
            <input
              type="date"
              name="mfd"
              placeholder="Manufacturing Date"
              value={formValues.mfd}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.mfd}</p>
          <div className="field">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              placeholder="Expiry Date"
              value={formValues.expiryDate}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.expiryDate}</p>

          <button className="fluid ui button blue">Submit</button>
        </div>
      </form> */}
    </div>
  );
}

export default MedicineAdd;
