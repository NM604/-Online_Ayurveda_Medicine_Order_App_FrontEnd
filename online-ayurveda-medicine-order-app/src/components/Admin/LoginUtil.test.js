import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import LoginUtil from "./LoginUtil";

describe("Admin Login Tests", () => {
  it("Rendered Login Form", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginUtil />
        </BrowserRouter>
      </Provider>
    );
    const form = getByTestId("admin-login-form");
    expect(form).toBeTruthy();
  });

  it("Rendered Update Form Div", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginUtil />
        </BrowserRouter>
      </Provider>
    );
    const form = getByTestId("update-form");
    expect(form).toBeTruthy();
  });

  it("Rendered Login Header", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginUtil />
        </BrowserRouter>
      </Provider>
    );
    const header = getByTestId("admin-header-1");
    expect(header).toBeTruthy();
  });

  it("Rendered update Button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginUtil />
        </BrowserRouter>
      </Provider>
    );
    const button = getByRole("button", { name: "update-button" });
    expect(button).toBeTruthy();
  });

  it("Rendered submit Button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginUtil />
        </BrowserRouter>
      </Provider>
    );
    const button = getByRole("button", { name: "submit-button" });
    expect(button).toBeTruthy();
  });

  it("Rendered register Button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginUtil />
        </BrowserRouter>
      </Provider>
    );
    const button = getByRole("button", { name: "register-button" });
    expect(button).toBeTruthy();
  });
});
