import { render, act, screen, wait } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/index"
import MedicineUpdate from "./MedicineUpdate"

describe("update rendering Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineUpdate />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("update-container");
      expect(details).toBeTruthy();
    });
});
describe("Add category button Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineUpdate />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("addCategory-button");
      expect(details).toBeTruthy();
    });
});
describe("Add category button Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineUpdate />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("add-table");
      expect(details).toBeTruthy();
    });
});