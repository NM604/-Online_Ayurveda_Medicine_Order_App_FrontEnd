import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import Admin from "./Admin";

describe("Admin Profile Page Tests", () => {
  it("Rendered admin profile page", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      </Provider>
    );
    const details = getByTestId("admin-container");
    expect(details).toBeTruthy();
  });

  it("Rendered admin page header", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      </Provider>
    );
    const details = getByTestId("admin-header-1");
    expect(details).toBeTruthy();
  });

  it("Rendered all admin page card", () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      </Provider>
    );
    const cards = getAllByTestId("card-items");
    expect(cards).toHaveLength(3);
  });

  it("Rendered all admin page buttons", () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      </Provider>
    );
    const buttons = getAllByRole("button", { name: "admin-button" });
    expect(buttons).toHaveLength(3);
  });

  it("Rendered all card buttons", () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      </Provider>
    );
    const buttons = getAllByRole("button", { name: "card-button" });
    expect(buttons).toHaveLength(4);
  });

  it("Rendered delete popup button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      </Provider>
    );
    const button = getByRole("button", { name: "popup-button" });
    expect(button).toBeTruthy();
  });
});
