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
  AlertTitle,
  // Select,
} from "@mui/material";
import backendAPI from "../../apis/backendAPI";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MedicineAdd() {
  const [formValues, setFormValues] = useState({
    categoryDTO: { categoryName: "" },
    companyName: "",
    expiryDate: "",
    medicineCost: 0,
    medicineName: "",
    mfd: "",
  });

  //for dialoge category
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [categoryForm, setCategoryForm] = useState({
    categoryName: "",
  });

  const [formErrors, setFormErrors] = useState({error:false});
  const [categoryFormErrors, setCategoryFormErrors] = useState({error:false});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCategorySubmit, setIsCategorySubmit] = useState(false);

  const [categoryNameList, setCategoryNameList] = useState([{}]);
  const [response, setResponse] = useState();


  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await backendAPI.get(
        "/oam/userinterface/category"
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

  const handleChangeCategory = (e) => {
    const categoryData = { ...categoryForm };
    categoryData[e.target.name] = e.target.value;
    
    setCategoryForm(categoryData);
    console.log(categoryData)
    // console.log(categoryForm)
  };

  const handleChange = (e) => {
    // setFormErrors(validate(formValues))
    const newdata = { ...formValues };
    newdata[e.target.name] = e.target.value;
    console.log(newdata);
    // setFormErrors(validate(formValues))
    setFormValues(newdata);

    // setFormErrors(validate(formValues))
  };

  const addCategory = async () => {
    try {
      await backendAPI.post("/oam/userinterface/category", {
        categoryName: categoryForm.categoryName,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addmed = async () => {
    try {
      await backendAPI
        .post("/oam/userinterface/medicine", {
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

  const handleSubmitCategory = (e) => {
    // e.preventDefault();
   
    setCategoryFormErrors(validateCategory(categoryForm));
    console.log(categoryFormErrors);
    if (formErrors.error === false){
      addCategory();
    console.log("category added !!!");
    setIsCategorySubmit(true);
    handleClose();
    window.location.reload(false);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log(formErrors);

    if (formErrors.error === false){
      addmed();
      console.log("added!!!");
      setIsSubmit(true);
  
    }

    
    
  };

  const validateCategory = (values) => {
    console.log("validating Category!!!");
    const categoryErrors = { error: false };
    const letters = /^([a-z]+\s?)+$/;
    
    if (!values.categoryName) {
      categoryErrors.categoryName = "Category name Required!";
      categoryErrors.error = true;
    }
    else if(!letters.test(values.categoryName.toLowerCase())){
      categoryErrors.categoryName = "Category name cannot have digits!";
      categoryErrors.error = true;
    }
    console.log(categoryErrors);
    return categoryErrors;
  };

  const validate = (values) => {
    console.log("validating!!!");
    const errors = { error: false };

    const letters = /^([a-z]+\s?)+$/;
    const numbers = /^[0-9]+$/;

    // const regex = [0-9]+;
    if (!values.medicineName) {
      errors.medicineName = "Medicine name is required!";
      errors.error = true;
    }
    if (!values.companyName) {
      errors.companyName = "Company name is required!";
      errors.error = true;
    }
    else if(!letters.test(values.companyName.toLowerCase())){
      errors.companyName = "Company name cannot have digits!";
      errors.error = true;
    }
    if (!values.mfd) {
      errors.mfd = "Manufacturing date is required!";
      errors.error = true;
    } 

    if (!values.expiryDate) {
      errors.expiryDate = "Expiry date is required!";
      errors.error = true;
    } 
    if (!values.medicineCost) {
      errors.medicineCost = "Medicine cost is required!";
      errors.error = true;
    } else if (values.medicineCost <= 0) {
      errors.medicineCost = "Medicine cost should be more than 0!";
      errors.error = true;
    } else if(!numbers.test(values.medicineCost)){
      errors.medicineCost = "Medicine cost field cannot have letters!";
      errors.error = true;
    }
    console.log(errors);
    return errors;
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  return (
    <div data-testid= "medicineAdd-container">
      {/* MedicineAdd */}

      <div className={classes.formContainer}>
        <Typography data-testid= "medicineAdd-header" gutterBottom variant="h4" align="center">
          Add medicine
          {/* <p>{formErrors.medicineName}</p> */}
        </Typography>
        <Button data-testid= "medicineAdd-category" className={classes.addCategory} variant="outlined" onClick={handleClickOpen}>
        Add Category
      </Button>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>Add Category</DialogTitle>
                          <DialogContent>
                            {/* <DialogContentText>
                              Enter category name
                            </DialogContentText> */}
                            <form > 
                            <TextField
                              autoFocus
                              margin="dense"
                              onChange={handleChangeCategory}
                              name="categoryName"
                              value={categoryForm.categoryName}
                              label="Category Name"
                              type="text"
                              fullWidth
                              variant="standard"
                              required
                            />
                            </form>
                            {categoryFormErrors.error ===true && (
                    <Alert severity="error">{categoryFormErrors.categoryName}</Alert>
                  )}
                          </DialogContent>
                          
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmitCategory}>Add</Button>
                          </DialogActions>
                        </Dialog>

        <Grid>
          <Card data-testid= "medicineAdd-card"
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent data-testid= "medicineAdd-card2">
              <form>
                <Grid container spacing={1}>
                  <Grid xs={12} item></Grid>
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
                      inputProps={{ max: formatDate(new Date()) }}
                      // max={formatDate(new Date())}
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
                      inputProps={{ min: formatDate(new Date()) }}
                      min={formatDate(new Date())}
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
                {/* <AlertTitle>Error</AlertTitle> */}
                <div className={classes.errors}>
                  {isSubmit===true && formErrors.error === false && (
                    <Alert severity="success">Medicine added !!!</Alert>
                  )}

                  {formErrors.medicineName && (
                    <Alert severity="error">{formErrors.medicineName}</Alert>
                  )}
                  {formErrors.medicineCost && (
                    <Alert severity="error">{formErrors.medicineCost}</Alert>
                  )}
                  {formErrors.companyName && (
                    <Alert severity="error">{formErrors.companyName}</Alert>
                  )}

                  {formErrors.mfd && (
                    <Alert severity="error">{formErrors.mfd}</Alert>
                  )}
                  {formErrors.expiryDate && (
                    <Alert severity="error">{formErrors.expiryDate}</Alert>
                  )}
                </div>

                {/* <br/>{formErrors.medicineCost}<br/>{formErrors.companyName}<br/>{formErrors.mfd}<br/>{formErrors.expiryDate} */}
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>

   
    </div>
  );
}

export default MedicineAdd;
