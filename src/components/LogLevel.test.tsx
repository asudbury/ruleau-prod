import React from "react";
import { fireEvent, render } from "@testing-library/react";
import LogLevel from "./LogLevel";

test("Render LogLevel", () => {
  const { getByTestId } = render(<LogLevel />);

  const logLevelSelect = getByTestId("logLevelSelect");

  expect(logLevelSelect).toBeInTheDocument();

  fireEvent.click(logLevelSelect);
});
