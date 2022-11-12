import OrderItem from "./OrderItem";
import { render, act, screen, wait, getAllByRole } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../store/index";

describe("Orders item component ", () => {
  it("Rendered order item row", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderItem />
        </BrowserRouter>
      </Provider>
    );
    const details = getByTestId("order-row");
    expect(details).toBeTruthy();
  });

  it("Check item row have status", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderItem
            data-testid="order-item"
            key='1'
            id='1'
            cost='200'
            status='CREATED'
            orderDate='2022-11-11'
            dispatchDate='2022-11-11'
          />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("CREATED")).toBeInTheDocument();
  });

  it("Check if item have cancel button for status CREATED", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderItem
            data-testid="order-item"
            key='1'
            id='1'
            cost='200'
            status='CREATED'
            orderDate='2022-11-11'
            dispatchDate='2022-11-11'
          />
        </BrowserRouter>
      </Provider>
    );
    const btn = getByRole("button",{name:"cancel-btn"});
    expect(btn).toBeTruthy();
  });
  it("Check if item have details button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderItem
            data-testid="order-item"
            key='1'
            id='1'
            cost='200'
            status='CREATED'
            orderDate='2022-11-11'
            dispatchDate='2022-11-11'
          />
        </BrowserRouter>
      </Provider>
    );
    const btn = getByRole("button",{name:"detail-btn"});
    expect(btn).toBeTruthy();
  });
});
