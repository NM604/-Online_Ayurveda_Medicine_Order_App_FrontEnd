import { render} from "@testing-library/react";
import OrderProductDetails from "./OrderProductDetails";

describe("Order Products", () => {

  it("rendered products", () => {
    const { getByTestId } = render(<OrderProductDetails />);
    const section = getByTestId("header");
    expect(section).toBeTruthy();
  });

//   it("render one button before click", () => {
//     const { getAllByTestId } = render(<Button />);
//     const buttonList = getAllByTestId("button");
//     expect(buttonList).toHaveLength(1);
//   });

  // it("render two buttons after click", () => {
  //   act(async () => {
  //     const { getAllByTestId } = render(<Button />);
  //     const buttonList = getAllByTestId("button");
  //     await waitFor.click(buttonList[0]);
  //     expect(getAllByTestId("button")).toHaveLength(2);
  //   });
  // });
});
