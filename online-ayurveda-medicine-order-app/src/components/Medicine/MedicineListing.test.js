import { render, act, screen, wait } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MedicineListing from "./MedicineListing";
// import { fetchMedicines } from "./apis/medicines";
// import store from "../../../store/index";
import store from "../../store/index"

describe("Listing rendering Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineListing />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("medicineListing-container");
      expect(details).toBeTruthy();
    });
});
describe("Listing rendering Tests", () => {
    it("Rendered admin profile page", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <BrowserRouter>
            <MedicineListing />
          </BrowserRouter>
        </Provider>
      );
      const details = getByTestId("medicine-container");
      expect(details).toBeTruthy(); 
    });
});

