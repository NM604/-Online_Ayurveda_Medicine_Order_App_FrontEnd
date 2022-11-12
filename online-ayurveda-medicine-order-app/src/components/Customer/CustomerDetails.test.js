import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import CustomerDetails from "./CustomerDetails";

describe("Customer Profile Page Tests", () => {
  it("Rendered customer profile page", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomerDetails />
        </BrowserRouter>
      </Provider>
    );
    const details = getByTestId("customer-container");
    expect(details).toBeTruthy();
  });

  it("Rendered customer page header", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomerDetails />
        </BrowserRouter>
      </Provider>
    );
    const details = getByTestId("customer-header-1");
    expect(details).toBeTruthy();
  });

  it("Rendered all customer page buttons", () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomerDetails />
        </BrowserRouter>
      </Provider>
    );
    const buttons = getAllByRole("button", { name: "customer-button" });
    expect(buttons).toHaveLength(3);
  });

  it("Rendered delete popup button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomerDetails />
        </BrowserRouter>
      </Provider>
    );
    const button = getByRole("button", { name: "popup-button" });
    expect(button).toBeTruthy();
  });
});
