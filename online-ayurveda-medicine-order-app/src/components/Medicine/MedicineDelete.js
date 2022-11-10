import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import Card from "../UI/Card";

const MedicineDelete = () => {
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
      console.log(response);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const deleteMedicine = async (medicineId) => {
    try{
        await axios.delete(
            `http://localhost:8080/oam/userinterface/medicine/${medicineId}`
          ).then((res)=>{console.log("deleted!!!",res)});
    }
    catch(error){
        console.log(error);
    }
  };
  const formHandler = (medicineId) => {

    deleteMedicine(medicineId);
    window.location.reload(false);
    

  };

  return (
    <div className="productListing">
      <h1>All medicines</h1>
      {error && <h1>{error.message}</h1>}
      {medicines.map((post) => {
        const { medicineId, medicineName, medicineCost, companyName } = post;
        const medItem = {
          medicineId: medicineId,
          medicineName: medicineName,
       
          price: medicineCost,
        };
        return (
          <Card>
            <div key={medicineId}>
              <h1>{medicineName}</h1>
              <h2>{companyName}</h2>
              <h2>{medicineCost}</h2>
              {/* window.location.reload(false); */}
                <button type="button" onClick={()=>formHandler(medicineId)}>Delete</button>
              
            </div>
          </Card>
        );
      })}
      ;
    </div>
  );
};

export default MedicineDelete;
