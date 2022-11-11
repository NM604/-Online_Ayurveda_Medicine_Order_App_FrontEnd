import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./MedicineUpdate.module.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import red from "@mui/material/colors/red";
import UpgradeIcon from '@mui/icons-material/Upgrade';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

const MedicineUpdate = () => {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState({});

  // axios.get("http://localhost:8080/oam/userinterface/medicine"
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/oam/userinterface/medicine"
      );
      setMedicines(response.data);
      console.log(response);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const deleteMedicine = async (medicineId) => {
    try {
      await axios
        .delete(
          `http://localhost:8080/oam/userinterface/medicine/${medicineId}`
        )
        .then((res) => {
          console.log("deleted!!!", res);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteHandler = (medicineId) => {
    deleteMedicine(medicineId);
    window.location.reload(false);
  };

  const updateHandler = (medicineId) => {
    // updateMedicine(medicineId);
  };

  return (
    <div className={classes.productListing}>
      <div className={classes.addButton}>
      <Link to={"/addMedicines"}> 
      <Button
        type="button"
        size="small"
        variant="contained"
        // onClick={() => updateHandler(row.medicineId)}
      >
        Add medicine
      </Button>
      </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>All Medicines</caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">Medicine Id</TableCell>
              <TableCell align="center">Medicine Name</TableCell>
              <TableCell align="center">Company Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((row) => (
              <TableRow key={row.medicineId}>
                <TableCell align="center" component="th" scope="row">
                  {row.medicineId}
                </TableCell>
                <TableCell align="center">{row.medicineName}</TableCell>
                <TableCell align="center">{row.companyName}</TableCell>
                <TableCell align="center">{row.medicineCost}</TableCell>
                <TableCell align="center">
                  {row.categoryDTO.categoryName}
                </TableCell>
                <TableCell align="center">
                  {/* <Button variant="outlined" color="error">
                    Error
                  </Button> */}
                  <div className={classes.buttonContainer}>
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        size="small"
                        color="primary"
                        onClick={() => deleteHandler(row.medicineId)}
                      >
                        Delete
                      </Button>
                    </ThemeProvider>
                    {/* <div>    </div> */}
                    {/* <br/><br/> */}
                    <Link to={`/medicine-updateform/${row.medicineId}`}>
                      <Button
                        startIcon = {<UpgradeIcon/>}
                        type="button"
                        size="small"
                        variant="contained"
                        // onClick={() => updateHandler(row.medicineId)}
                      >
                        Update
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {error && <h1>{error.message}</h1>}
    </div>
  );
};

export default MedicineUpdate;
