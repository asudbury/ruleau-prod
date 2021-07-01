import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TestComponent from "./TestComponent";

test("Render TestComponent", () => {
  const { getByTestId } = render(<TestComponent />);

  const sampleCallsButton = getByTestId("sampleCallsButton");

  expect(sampleCallsButton).toBeInTheDocument();

  fireEvent.click(sampleCallsButton);
});
