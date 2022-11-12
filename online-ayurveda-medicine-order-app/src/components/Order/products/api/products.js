import axios from "axios";

export const fetchOrderMedicines =async (id)=>{
    try {
        const data = await axios.get(
            `http://localhost:8080/oam/order-items/order-details/${id}`
          );
        const orderItems = await data.data;
        return await orderItems
      } catch (err) {
        throw err
      }
}
