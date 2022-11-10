import { Axios, AxiosError } from "axios";
import React from "react";
import "./Popup.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";

function Popup(props) {
  console.log(props);
  // const [data, setData] = useState({
  //   id: '',
  //   dispatchDate: '',
  //   orderDate: '',
  //   orderStatus: '',
  //   cost: '',
  // });

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    id: props.prop.id,
    dispatchDate: props.prop.dispatchDate,
    orderDate: props.prop.orderDate,
    orderStatus: props.prop.status,
    cost: parseInt(props.prop.cost),
    customerId: props.prop.customerId,
    // customerId: props.prop.customerId
  });

  // const body = {
  //   id: formData.id,
  //   dispatchDate: formData.dispatchDate,
  //   orderDate: formData.orderDate,
  //   orderStatus: formData.orderStatus,
  //   totalCost: formData.totalCost,

  // }

  function onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let formObj = { ...formData };
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  }

  // const body = {
  //   orderDetailId: formData.orderDetailId,
  //   dispatchDate: formData.dispatchDate,
  //   orderDate: formData.orderDate,
  //   orderStatus: formData.orderStatus,
  //   totalCost: formData.totalCost,
  //   customer: props.prop.customer,
  // }

  // const submitHandler = () => {
  //   updateStatus();
  //   window.location.reload(false);
  // };
  // const updateStatus = async () => {
  //   try {
  //     const data = await axios.put(
  //       `http://localhost:8080/oam/order-details`,formData

  //     );
  //     // const orderItems = await data.data;
  //     console.log(formData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const submitHandler = (e) => {

  //   // setFormErrors(validate(formValues));
  //   updateOrder();
  // };

  // const updateOrder = async () => {
  //   const data = await backendAPI
  //     .put(`http://localhost:8080/oam/order-detail`, body)
  //     .then((orders) => {
  //       setOrders(orders.data);
  //       window.location.reload(false);
  //     })
  //     .catch((error) => {
  //       setOrders(error.orders.data.errorMessage);
  //     });
  // };
  // const updateMedicine= async (medicineId)=>{
  //   try{
  //     const res=await axios.put(``,)
  //   }
  // }

  async function submitHandler() {
    console.log(formData);
    console.log('data');
    const putData = {
      orderDetailId: formData.id,
      orderDate: formData.orderDate,
      dispatchDate: formData.dispatchDate,
      orderStatus: formData.orderStatus,
      totalCost: formData.cost,
      customer: {
        customerId: props.prop.customerId,
        customerName: props.prop.customerName,
        customerPassword: props.prop.customerPassword,
      },
    };
    console.log(putData);

    try {
      const data = await axios.put(
        `http://localhost:8080/oam/order-details`,
        putData
      );
      const orderItems = await data.data;
      console.log(orderItems);
      props.setTrigger(false);
      props.prop.fetchData();
      // let res = await fetch("http://localhost:8080/oam/order-details", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     orderDetailId: formData.id,
      //     orderDate: formData.orderDate,
      //     dispatchDate: formData.dispatchDate,
      //     orderStatus: formData.orderStatus,
      //     totalCost: formData.totalCost,
      //     customer: {
      //       customerId: props.prop.customerId,
      //       customerName: props.prop.customerName,
      //       customerPassword: props.prop.customerPassword,
      //     },
      //   }),
      // });

      // if (res.status == 200) {
      //   props.setTrigger(false);
      //   props.prop.fetchData();
      // } else {
      // }
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="popup"
      // style={{position:'relative', textAlign:'center'}}
    >
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        <div
          className="d-flex justify-content-center"
          style={{ width: "100px", height: "100px", zIndex: 9999 }}
          // onSubmit={(e) => submitHandler(e)}
        >
          <form>
            <div style={{ width: "70vw" }} className="d-flex row">
              <div>
                <label>Dispatch date :</label>
                <input
                  type="date"
                  placeholder="dispatch date"
                  name="dispatchDate"
                  value={formData.dispatchDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dispatchDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Order date :</label>
                <input
                  type="date"
                  placeholder="order date"
                  value={formData.orderDate}
                  name="orderDate"
                  onChange={(e) =>
                    setFormData({ ...formData, orderDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Order Status :</label>
                <input
                  type="text"
                  placeholder="order status"
                  value={formData.orderStatus}
                  name="orderStatus"
                  onChange={(e) =>
                    setFormData({ ...formData, orderStatus: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Cost :</label>
                <input
                  type="number"
                  placeholder="cost"
                  // disabled={true}
                  value={formData.cost}
                  name="totalCost"
                  onChange={(e) => {
                    console.log(e);
                    setFormData({ ...formData, cost: e.target.value });
                  }}
                ></input>
              </div>

              <div>
                <label>Customer Id :</label>
                <input
                  type="number"
                  placeholder="customer id"
                  disabled={true}
                  value={formData.customerId}
                  name="customerId"
                  onChange={(e) =>
                    setFormData({ ...formData, customerId: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Id :</label>
                <input
                  type="number"
                  placeholder=" id"
                  disabled={false}
                  value={formData.id}
                  name="Id"
                  onChange={(e) =>
                    setFormData({ ...formData, orderDetailId: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
          <button onClick={submitHandler}>submit</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;

{
  /* <AdminOrderItem
key={order.orderDetailId}
id={order.orderDetailId}
cost={order.totalCost}
status={order.orderStatus}
orderDate={order.orderDate}
dispatchDate={order.dispatchDate}
customerId={order.customerId}
fetchData={fetchData}
/> */
}
