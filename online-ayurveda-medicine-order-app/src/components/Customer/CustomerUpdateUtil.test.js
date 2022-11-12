import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CustomerUpdateUtil from "./CustomerUpdateUtil";

describe("Customer Update Tests", () => {
  it("Rendered Update Form", () => {
    const { getByTestId } = render(<CustomerUpdateUtil />);
    const form = getByTestId("update-form-2");
    expect(form).toBeTruthy();
  });

  it("Rendered update Button", () => {
    const { getByRole } = render(<CustomerUpdateUtil />);
    const button = getByRole("button", { name: "update-button-2" });
    expect(button).toBeTruthy();
  });

  it("Rendered Update Header", () => {
    const { getByTestId } = render(<CustomerUpdateUtil />);
    const header = getByTestId("customer-header-2");
    expect(header).toBeTruthy();
  });
});
