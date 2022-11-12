import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
// import Card from "../UI/Card";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import classes from "./MedicineListing.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MedicineLIstingItem from "./MedicineLIstingItem";

const MedicineListing = () => {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [cartError, setCartError] = useState();

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

  const cartHandler = (item) => {
    console.log(quantity);
    if (!quantity) {
      setCartError("Choose a quantity");
    } else {
      dispatch(cartActions.addItem(item));
    }
  };
  const [quantity, setQuantity] = useState();

  return (
    <div>
      <h1 className={classes.heading}>All medicines</h1>
      <div className={classes.productContainer}>
        {error && <h1>{error.message}</h1>}
        {medicines.map((post) => {
          const { medicineId, medicineName, medicineCost, companyName } = post;
          const medItem = {
            medicineId: medicineId,
            medicineName: medicineName,
            quantity: quantity,
            price: medicineCost,
          };
          return (
            <MedicineLIstingItem
              medicineId={medicineId}
              medicineName={medicineName}
              medicineCost={medicineCost}
              companyName={companyName}
            />
            // <div className={classes.container}>
            //   <div className={classes.product} key={medicineId}>
            //     <Card className={classes.card} sx={{ maxWidth: 345 }}>
            //       <CardMedia
            //         component="img"
            //         alt="green iguana"
            //         height="140"
            //         image="https://picsum.photos/200"
            //       />
            //       <CardContent>
            //         <Typography
            //           align="center"
            //           gutterBottom
            //           variant="h4"
            //           component="div"
            //         >
            //           {medicineName}
            //         </Typography>
            //         <Typography
            //           align="center"
            //           variant="body2"
            //           color="text.secondary"
            //         >
            //           By {companyName}
            //         </Typography>
            //         <Typography
            //           align="center"
            //           variant="h6"
            //           color="text.secondary"
            //         >
            //           $ {medicineCost}
            //         </Typography>
            //       </CardContent>
            //       <CardActions>
            //         <Button size="small">
            //           <form
            //             onSubmit={(e) => {
            //               e.preventDefault();
            //               cartHandler(medItem);
            //             }}
            //           >
            //             {/* <Typography>Quantity</Typography> */}

            //             {/* <Button onChange={()=>setQuantity(e.target.value+1)} size="small" variant="contained" type="submit">
            //               +
            //             </Button> */}
            //             {/* {quantity} */}
            //             <div className={classes.inpurField}>
            //               <input
            //                 className={classes.input}
            //                 onChange={(e) => setQuantity(e.target.value)}
            //                 type="number"
            //                 placeholder="Quantity"
            //                 name="qty"
            //                 min="1"
            //               />
            //               {/* <Button onChange={(e)=>setQuantity(e.target.value-1)}   size="small" variant="contained" type="submit">
            //               -
            //             </Button> */}
            //               <Button variant="contained" type="submit">
            //                 Add to cart
            //               </Button>
            //             </div>
            //             <span>{cartError}</span>
            //           </form>
            //         </Button>
            //       </CardActions>
            //     </Card>
            //     {/* <h1>{medicineName}</h1>
            //     <h2>{companyName}</h2>
            //     <h2>{medicineCost}</h2> */}
            //     {/* <form
            //       onSubmit={(e) => {
            //         e.preventDefault();
            //         console.log("Submitted");
            //         cartHandler(medItem);
            //       }}
            //     >
            //       <label>Quantity</label>
            //       <input
            //         onChange={(e) => setQuantity(e.target.value)}
            //         type="number"
            //         name="qty"
            //         min="1"
            //       />
            //       <button type="submit">Add to cart</button>
            //     </form> */}
            //   </div>
            // </div>
          );
        })}
        ;
      </div>
    </div>
  );
};

export default MedicineListing;
