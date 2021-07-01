import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Error from "./Error";

test("Render Error component", () => {
  const { getByTestId } = render(<Error />);

  const goHomeButton = getByTestId("goHomeButton");

  expect(goHomeButton).toBeInTheDocument();

  fireEvent.click(goHomeButton);

  const viewLogLink = getByTestId("viewLogLink");

  expect(viewLogLink).toBeInTheDocument();
});

test("Go Home Button", () => {
  const { getByTestId } = render(<Error />);

  const goHomeButton = getByTestId("goHomeButton");

  fireEvent.click(goHomeButton);
});

test("View Log Link", () => {
  const { getByTestId } = render(<Error />);

  const viewLogLink = getByTestId("viewLogLink");

  fireEvent.click(viewLogLink);
});
