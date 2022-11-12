import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UpdateUtil from "./UpdateUtil";

describe("Admin Update Tests", () => {
  it("Rendered Update Form", () => {
    const { getByTestId } = render(<UpdateUtil />);
    const form = getByTestId("update-form-2");
    expect(form).toBeTruthy();
  });

  it("Rendered update Button", () => {
    const { getByRole } = render(<UpdateUtil />);
    const button = getByRole("button", { name: "update-button-2" });
    expect(button).toBeTruthy();
  });

  it("Rendered Update Header", () => {
    const { getByTestId } = render(<UpdateUtil />);
    const header = getByTestId("admin-header-2");
    expect(header).toBeTruthy();
  });
});
