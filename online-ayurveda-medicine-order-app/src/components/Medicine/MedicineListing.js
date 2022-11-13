import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

import classes from "./MedicineListing.module.css";
import backendAPI from "../../apis/backendAPI";
import MedicineLIstingItem from "./MedicineLIstingItem";

const MedicineListing = () => {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [cartError, setCartError] = useState();

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
    <div >
      <h1 data-testid= "medicineListing-container" className={classes.heading}>All medicines</h1>
      {/* {error && <h1>{error.message}</h1>} */}
      <div data-testid= "medicine-container" className={classes.productContainer}>
        
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
           
          );
        })}
        
      </div>
    </div>
  );
};

export default MedicineListing;
