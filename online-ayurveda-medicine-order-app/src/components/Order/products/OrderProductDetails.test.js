import { render, act, screen, wait } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import OrderProductDetails from "./OrderProductDetails";
import store from "../../../store/index";
import { fetchOrderMedicines } from "./api/products";

jest.mock("./api/products");

describe("Orders page ", () => {
  it("Rendered order product header", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderProductDetails />
        </BrowserRouter>
      </Provider>
    );
    const details = getByTestId("medicine-details-header");
    expect(details).toBeTruthy();
  });

  it("Check fetch call ", async () => {
    const orderItems = [
      {
        orderItemId: 7,
        quantity: 4,
        price: 25,
        orderDetail: {
          orderDetailId: 5,
          orderDate: "2022-11-11",
          dispatchDate: "2022-11-18",
          orderStatus: "CANCELLED",
          totalCost: 100,
          customer: {
            customerId: 1,
            customerName: "fazil",
            customerPassword: "1234",
          },
        },
        medicine: {
          medicineId: 1,
          medicineName: "paracetamol",
          medicineCost: 2,
          mfd: "2020-10-05",
          expiryDate: "2022-10-20",
          companyName:'com',
          categoryDTO:null
        }
      }
    ];
    fetchOrderMedicines.mockResolvedValueOnce(orderItems);
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <OrderProductDetails />
          </BrowserRouter>
        </Provider>
      )
    );

    expect(fetchOrderMedicines).toHaveBeenCalledTimes(1);
  });
});
