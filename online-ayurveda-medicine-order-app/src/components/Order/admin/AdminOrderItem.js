import  { Fragment, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Card from "../../UI/Card";
import { UpdateOrderPopup } from "./Popup.js";
import Popup from "./Popup.js";
import classes from './AdminOrderItem.module.css'

const AdminOrderItem = (props) => {
const [buttonPopup,setButtonPopup]=useState(false);


  let bg = "";
  switch (props.status) {
    case "CREATED":
      bg = "rgb(38, 110, 218)";
      break;
    case "CANCELLED":
      bg = "rgb(243, 29, 29)";
      break;
    case "COMPLETED":
      bg = "rgb(28, 217, 107)";
      break;
    default:
      bg = "white";
  }
  
  const [orders, setOrders] = useState([]);
  const [error,setError] =useState({}); 
  

//   const updateData = async () => {
//     try {
//       const data = await axios.get(
//         `http://localhost:8080/oam/order-details/${props.id}`
//       );
//       console.log(data);
//       if(data.status==200){
//      await  props.fetchData()
//       }else{
//         setError(data.errorMessage);
//       }
//     //   const AdminorderItems = await data.data;
//     //   setOrders(AdminorderItems);
//     } catch (err) {
//       setError(err);
//     }
//   };

  return (
    <li>
      <Card className={classes.item}>
        <div className={classes["item-details"]}>
          <div className={classes.id}>
            <span>OrderId</span>
            <h4>{props.id}</h4>
            <span>customerId</span>
            <h4>{props.customerId}</h4>
          </div>
          {/* <div className={classes.customerId}>
            <span>CustomerId</span>
            <h4>{props.customerId}</h4>
          </div> */}
          <div className={classes.info}>
            <div className={classes["info-price"]}>
              &#x20B9;{props.cost.toFixed(2)}
            </div>
            <div
              style={{
                backgroundColor: `${bg}`,
              }}
              className={classes["info-status"]}
            >
              {props.status}
            </div>
            <button className={classes["info-status"]}  style={{color:"white"}} onClick={()=>setButtonPopup(true)}  > UPDATE ORDER

            </button >
            <Popup prop={props} trigger={buttonPopup} setTrigger={setButtonPopup}/>
            
            
            
          </div>
        </div>
        <div className={classes["item-dates"]}>
          <span>Order date: {props.orderDate}</span>
          <span>Dispatch date: {props.dispatchDate}</span>
        </div>
      </Card>
    </li>
  );
};

export default AdminOrderItem;
