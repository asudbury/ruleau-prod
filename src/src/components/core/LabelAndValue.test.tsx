import React from "react";
import { render } from "@testing-library/react";
import LabelAndValue from "./LabelAndValue";

test("Render the Label and Value", () => {
  const { getByTestId } = render(
    <LabelAndValue label="adrian" variant="h1" value="sudbury" />
  );

  const labelAndValue = getByTestId("labelAndValue");

  expect(labelAndValue).toBeInTheDocument();
});
