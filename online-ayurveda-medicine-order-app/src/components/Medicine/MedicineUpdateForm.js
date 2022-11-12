import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';

import classes from "./MedicineAdd.module.css";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  // Select,
} from "@mui/material";














function MedicineUpdateForm() {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState({});
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    categoryDTO: { categoryId: 1, categoryName: "hair" },
    companyName: "",
    expiryDate: "",
    medicineCost: 0,
    medicineName: "",
    mfd: "",
    // medicineId: medicineId;
    // medicineId: 0,
  });

  useEffect(() => {
    fetchMedicine(medicineId);
    console.log(medicine.medicineId);
   
    // setMedicine(fetchedMed);
  }, []);

  const fetchMedicine = async () => {
    try {
      const res = await axios
        .get(`http://localhost:8080/oam/userinterface/medicine/${medicineId}`)
        // .then((res) => console.log("fetched!!!", res.data));
        // console.log(res.data);
        setMedicine(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    const newdata  = {...formValues};
    newdata[e.target.name] = e.target.value;
    setFormValues(newdata);
    console.log(newdata);
    
    // const { name, value } = e.target;
    // setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  // {
  //   medicineId: 11,
  //   medicineName: "giloyi",
  //   medicineCost: 499,
  //   mfd: "2021-10-02",
  // expiryDate: "2023-10-02",
  //   companyName: "abcd",
  //   categoryDTO: {
  //     categoryId: 1,
  //     categoryName: "hair"
  //   }
  // }
  const updateMedicine = async () =>{
    try{
      const res = await axios.put(`http://localhost:8080/oam/userinterface/medicine`,{
        medicineId: medicine.medicineId,
        categoryDTO: formValues.categoryDTO,
        companyName: formValues.companyName,
        expiryDate: formValues.expiryDate,
        medicineCost: formValues.medicineCost,
        medicineName: formValues.medicineName,
        mfd: formValues.mfd
      });
      console.log(res.data);
    }
    catch(error){
      console.log(error);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    updateMedicine();
    console.log("Updated!!!")
    setIsSubmit(true);

    
  };
  const validate = (values) => {

    console.log("validating!!!")
    const errors = {error:false};
    const today = new Date();
    // const regex = [0-9]+;
    if (!values.medicineName) {
      errors.medicineName = "Medicine name is required!";
      errors.error = true;

    }
    if (!values.companyName) {
      errors.companyName = "Company name is required!";
      errors.error = true;
    }
    if (!values.mfd) {
      errors.mfd = "Manufacturing date is required!";
      errors.error = true;
    }
    else if (values.mfd >= today ){
      errors.mfd = "Manufacturing date cannot be future!";
      errors.error = true;
    }
    
    if (!values.expiryDate) {
      errors.expiryDate = "Expiry date is required!";
      errors.error = true;
    }
    else if (values.expiryDate  >= today ){
      errors.expiryDate = "Expiry date cannot be in past!";
      errors.error = true;
    }
    if (!values.medicineCost) {
      errors.medicineCost = "Medicine cost is required!";
      errors.error = true;
    }
    else if (values.medicineCost<= 0) {
      errors.medicineCost = "Medicine cost should be more than 0!";
      errors.error = true;
    }
    console.log(errors);
    return errors;
  };
  // const validate = (values) => {

  //   console.log("validating!!!")
  //   const errors = {};
  //   const today = new Date();
  //   // const regex = [0-9]+;
  //   if (!values.medicineName) {
  //     errors.medicineName = "medicine name is required!";

  //   }
  //   if (!values.companyName) {
  //     errors.companyName = "company name is required!";
  //   }
  //   if (!values.mfd) {
  //     errors.mfd = "manufacturing date is required!";
  //   }
  //   else if (values.mfd >= today ){
  //     errors.mfd = "manufacturing date cannot be future!";
  //   }
    
  //   if (!values.expiryDate) {
  //     errors.expiryDate = "expiry date is required!";
  //   }
  //   else if (values.expiryDate  >= today ){
  //     errors.expiryDate = "expiry date cannot be in past!";
  //   }
  //   if (!values.medicineCost) {
  //     errors.medicineCost = "medicine cost is required!";
  //   }
  //   else if (values.medicineCost<= 0) {
  //     errors.medicineCost = "medicine cost should be more than 0!";
  //   }
  //   console.log(errors);
  //   return errors;
  // };
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
<div className={classes.formContainer}>
        <Typography gutterBottom variant="h4" align="center" >
          Update Medicine
          {/* <p>{formErrors.medicineName}</p> */}
        </Typography>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <form >
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
                      placeholder={medicine.medicineName}
                      value={formValues.medicineName}
                      onChange={handleChange}
                      label="Medicine Name"
                      variant="outlined"
                  
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // required
                      
                    />
                    
                  </Grid>
                  
                  <Grid xs={9} sm={4} item>
                    <TextField
                      
                      type="number"
                      label="Cost"
                      align="center"
                      placeholder={medicine.medicineCost}
                      value={formValues.medicineCost}
                      name="medicineCost"
                      
                      onChange={handleChange}
                    
                      // margin="dense"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // required
                    />
                  </Grid>
                  <Grid xs={12}  item>
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
                  <Grid xs={12} sm={6}  item>
                  <TextField
                      type="date"
                      name="mfd"
                      placeholder="Manufacturing Date"
                      value={formValues.mfd}
                      onChange={handleChange}
                      variant="outlined"
                      label="Manufacturing Date"
                      inputProps={{max:formatDate(new Date())}}
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
                      inputProps={{min:formatDate(new Date())}}
                      min ={formatDate(new Date())}
                      fullWidth
                      // required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-Expiry"
                      type="date"
                      name="expiryDate"
                      placeholder="Expiry Date"
                      value={formValues.expiryDate}
                      onChange={handleChange}
                      defaultValue={medicine.expiryDate}
                      variant="outlined"
                      label="Expiry Date"
                      // min ={disableDate}
                      fullWidth
                      // required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid> */}

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
                <br/>
                
                <div className={classes.errors}>
                {
                  isSubmit===true && formErrors.error===false && <Alert severity="success">Medicine updated !!!</Alert>
                }

                {isSubmit===true && formErrors.medicineName &&  <Alert severity="error">{formErrors.medicineName}</Alert>}
                {isSubmit===true && formErrors.medicineCost &&  <Alert severity="error">{formErrors.medicineCost}</Alert>}
                {isSubmit===true && formErrors.companyName &&  <Alert severity="error">{formErrors.companyName}</Alert>}
                
                {isSubmit===true && formErrors.mfd &&  <Alert severity="error">{formErrors.mfd}</Alert>}
                {isSubmit===true && formErrors.expiryDate &&  <Alert severity="error">{formErrors.expiryDate}</Alert>}
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
















      {/* Current values
      <br/>
      <div>Medicine Id: {medicine.medicineId}</div>
      <div>Medicine Name: {medicine.medicineName}</div>
      <div>Medicine Cost: {medicine.medicineCost}</div>
      <div>Company Name: {medicine.companyName}</div>
      <div>Expiry Date: {medicine.expiryDate}</div>
      <div>Manufacturing Date: {medicine.mfd}</div>

   */}
      

      
    </div>
  );
}

export default MedicineUpdateForm;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function MedicineUpdate() {
//   const [id, setId] = useState();

// //   useEffect(() => {
// //     fetchMedicine(11);
// //   }, []);

//   const fetchMedicine = async () => {

//     try {
//       axios
//         .get(`http://localhost:8080/oam/userinterface/medicine/${id}`)
//         .then((res) => console.log("fetched!!!", res.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleInput = (e) => {
//     setId(e.target.value);
//   };

//   const fromHandler = (e) =>{
//     e.preventDefault();

//   }
//   return (
//     <div>
//       {/* <div>MedicineUpdate</div> */}
//       <form onSubmit={fromHandler}>
//         <label >Enter Medicine Id</label>
//           <input type="text" placeholder="medicine Id" onChange={handleInput}
//           ></input>
//           <button className="fluid ui button blue" onClick={fetchMedicine}>search</button>

//       </form>
//     </div>
//   );
// }

// export default MedicineUpdate;
