import { render, act, screen, wait } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AdminOrders from "./AdminOrders";
import store from "../../../store/index";
import AdminOrderItem from "./AdminOrderItem";
//import { fetchCustomerOrder } from "./api/orders";

//jest.mock("./api/orders");

describe("AdminOrders page ", () => {

    it("Rendered Adminorder header", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <AdminOrders />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("Adminorder-header");
      expect(details).toBeTruthy();
    });
    
    it("Rendered Adminorders list ", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <AdminOrders />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("Adminorders-list");
      expect(details).toBeTruthy();
    });
  
    it("Rendered update Button", () => {
        const { getByRole } = render(<AdminOrderItem />);
        const button = getByRole("button", { name: "update-button" });
        expect(button).toBeTruthy();
      });

      it("Rendered Filter Form", () => {
        const { getByTestId } = render(<AdminOrders />);
        const form = getByTestId("Filter-formlist");
        expect(form).toBeTruthy();
      });

      it("Rendered Select List", () => {
        const { getByTestId } = render(<AdminOrders />);
        const form = getByTestId("Filter-formlist");
        expect(form).toBeTruthy();
      });

      it("Rendered Select Search Bar", () => {
        const { getByTestId } = render(<AdminOrders />);
        const form = getByTestId("Filter-searchbar");
        expect(form).toBeTruthy();
      });
    
    
    
  });