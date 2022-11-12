import axios from "axios";

export const fetchCustomerOrder =async (custId)=>{
    try {
        const data = await axios.get(
          `http://localhost:8080/oam/order-details/customer/${custId}`
        );
        const orderItems = await data.data;
        return await orderItems
      } catch (err) {
        throw err
      }
}
