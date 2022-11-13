import { render, act, screen, wait } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MedicineAdd from "./MedicineAdd";
import store from "../../store/index";

describe("Add rendering Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineAdd />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("medicineAdd-container");
      expect(details).toBeTruthy();
    });
});
describe("Add headerTests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineAdd />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("medicineAdd-header");
      expect(details).toBeTruthy();
    });
});

describe("Add category Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineAdd />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("medicineAdd-category");
      expect(details).toBeTruthy();
    });
});
describe("Add card Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineAdd />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("medicineAdd-card"); 
      expect(details).toBeTruthy();
    });
});
describe("Add card Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineAdd />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("medicineAdd-card2");  
      expect(details).toBeTruthy();
    });
});