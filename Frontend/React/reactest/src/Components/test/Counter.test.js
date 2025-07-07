import { screen, render, fireEvent } from "@testing-library/react";
import Counter from "../Counter";
describe("counter test cases", () => {
  test("initial state check", () => {
    //rendering in isloation
    render(<Counter />);

    //selection
    const countText = screen.getByText("Count is 0");
    const plusElement = screen.getByText("+");
    const minusElement = screen.getByText("-");

    //we are verifying
    expect(countText).toBeInTheDocument();
    expect(plusElement).toBeInTheDocument();
    expect(minusElement).toBeInTheDocument();
  });

  test("increment by 1", () => {
    //rendering in isloation
    render(<Counter />);

    const plusElement = screen.getByText("+");
    fireEvent.click(plusElement);

    //selection
    const countText = screen.getByText("Count is 1");

    //we are verifying
    expect(countText).toBeInTheDocument();
  });

  test("decrement by 2", () => {
    //rendering in isloation
    render(<Counter />);

    const minusElement = screen.getByText("-");
    fireEvent.click(minusElement);
    fireEvent.click(minusElement);

    //selection
    const countText = screen.getByText("Count is -2");

    //we are verifying
    expect(countText).toBeInTheDocument();
  });

  test("snapshot for counter", () => {
    const {asFramgent} = render(<Counter></Counter>);
    expect(asFramgent()).toMatchSnapshot();
  })
});
