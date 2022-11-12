import { render, act, screen, wait } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Orders from "./Orders";
import store from "../../../store/index";
import { fetchCustomerOrder } from "./api/orders";

jest.mock("./api/orders");

describe("Orders page ", () => {

  it("Rendered order header", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Orders />
        </BrowserRouter>
      </Provider>
    );
    const details = getByTestId("order-header");
    expect(details).toBeTruthy();
  });
  
  it("Rendered order list ", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Orders />
        </BrowserRouter>
      </Provider>
    );
    const details = getByTestId("orders-list");
    expect(details).toBeTruthy();
  });

  it("Check fetch call ", async () => {
    const orderItems = [
      {
        orderDetailId: 8,
        orderDate: "2022-11-11",
        dispatchDate: "2022-11-18",
        orderStatus: "CREATED",
        customer: {
          customerId: 1,
          customerName: "fazil",
          customerPassword: "1234",
        },
      },
    ];
    fetchCustomerOrder.mockResolvedValueOnce(orderItems);
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Orders />
          </BrowserRouter>
        </Provider>
      )
    );
    expect(fetchCustomerOrder).toHaveBeenCalledTimes(1);
  });

  it("Rendered order item id", async () => {
    const orderItems = [
      {
        orderDetailId: 8,
        orderDate: "2022-11-11",
        dispatchDate: "2022-11-18",
        orderStatus: "CREATED",
        customer: {
          customerId: 1,
          customerName: "fazil",
          customerPassword: "1234",
        },
      },
      {
        orderDetailId: 9,
        orderDate: "2022-11-11",
        dispatchDate: "2022-11-18",
        orderStatus: "CREATED",
        customer: {
          customerId: 1,
          customerName: "fazil",
          customerPassword: "1234",
        },
      },
    ];
    fetchCustomerOrder.mockResolvedValueOnce(orderItems);
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Orders />
          </BrowserRouter>
        </Provider>
      )
    );
    expect(fetchCustomerOrder).toHaveBeenCalledTimes(1);
    orderItems.forEach((post) =>
      expect(screen.getByText(post.orderDetailId)).toBeInTheDocument()
    );
  });

  it("Rendered with empty order", async () => {
    const orderItems = [];
    fetchCustomerOrder.mockResolvedValueOnce(orderItems);
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Orders />
          </BrowserRouter>
        </Provider>
      )
    );
    expect(fetchCustomerOrder).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Your order is empty")).toBeInTheDocument();
  });
});
