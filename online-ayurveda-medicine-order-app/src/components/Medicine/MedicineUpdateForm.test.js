import { render, act, screen, wait } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/index"
import MedicineUpdateForm from "./MedicineUpdateForm";

describe("update rendering Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineUpdateForm />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("updateForm-container");
      expect(details).toBeTruthy();
    });
});
describe("update rendering container", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineUpdateForm />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("updateForm-container2");
      expect(details).toBeTruthy();
    });
});
describe("updateform rendering Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineUpdateForm />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("updateForm-card");
      expect(details).toBeTruthy();
    });
});
describe("update rendering Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineUpdateForm />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("updateForm-card2");
      expect(details).toBeTruthy();
    });
});
describe("update rendering Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineUpdateForm />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("updateForm-header");
      expect(details).toBeTruthy();
    });
});