import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// import Card from "../UI/Card";
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
import UpgradeIcon from "@mui/icons-material/Upgrade";
import blue from "@mui/material/colors/blue";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import backendAPI from "../../apis/backendAPI";


const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[700],
    },
  },
});

const MedicineUpdate = () => {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState({});

  // this if for delete pop up
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // axios.get("http://localhost:8080/oam/userinterface/medicine"
  const fetchMedicines = async () => {
    try {
      const response = await backendAPI.get(
        "/oam/userinterface/medicine"
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
      await backendAPI
        .delete(
          `/oam/userinterface/medicine/${medicineId}`
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

  return (
    <div className={classes.productListing}>
      {/* <h3 >Manage Medicines</h3> */}
      <div className={classes.addButton}>
        <Link to={"/addMedicines"}>
          <ThemeProvider theme={theme}>
          <Button
            type="button"
            // size="small"
            color="secondary"
            variant="contained"
            // onClick={() => updateHandler(row.medicineId)}
          >
            Add Medicine
          </Button>
          </ThemeProvider>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>All Medicines</caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Medicine Id</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Medicine Name</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Company Name</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Price</strong>
              </TableCell>
              <TableCell align="center">
                <strong>ExpiryDate</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Category</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
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
                <TableCell align="center">{row.expiryDate}</TableCell>

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
                        onClick={handleClickOpen}
                        // onClick={() => deleteHandler(row.medicineId)}
                      >
                        Delete
                      </Button>
                      <Dialog
                      type="paper"
                      PaperProps={{
                        style: {
                          // backgroundColor: "transparent",
                          boxShadow: "none"
                        },
                      }}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure, you want to delete Medicine ?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            This step cannot be reverted back. Once the medicine
                            is deleted, all the data related to medicine will be
                            deleted permanently!!!
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button
                            onClick={() => deleteHandler(row.medicineId)}
                            autoFocus
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog >
                    </ThemeProvider >
                    {/* <div>    </div> */}
                    {/* <br/><br/> */}
                    <Link to={`/medicine-updateform/${row.medicineId}`}>
                      <ThemeProvider theme={theme}>
                      <Button
                        startIcon={<UpgradeIcon />}
                        color="secondary"
                        type="button"
                        size="small"
                        variant="contained"
                        // onClick={() => updateHandler(row.medicineId)}
                      >
                        Update
                      </Button>
                      </ThemeProvider>
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
