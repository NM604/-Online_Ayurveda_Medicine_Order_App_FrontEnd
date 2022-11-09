import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
import Card from "./UI/Card";

const MedicineListing = () => {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  // axios.get("http://localhost:8080/oam/userinterface/medicine"
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/oam/userinterface/medicine"
      );
      setMedicines(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const cartHandler = (item) => {
    dispatch(cartActions.addItem(item));
  };
  const [quantity,setQuantity]=useState();

  return (
    <div className="productListing">
      <h1>All medicines</h1>
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
          <Card key={medicineId}>
            <div >
              <h1>{medicineName}</h1>
              <h2>{companyName}</h2>
              <h2>{medicineCost}</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  cartHandler(medItem);
                }}
              >
                <label>Quantity</label>
                <input onChange={(e)=>setQuantity(e.target.value)} type="number" name="qty" min="1" />
                <button type="submit">Add to cart</button>
              </form>
            </div>
          </Card>
        );
      })}
      ;
    </div>
  );
};

export default MedicineListing;
