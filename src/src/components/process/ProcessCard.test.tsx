import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render } from "@testing-library/react";
import ProcessCard from "./ProcessCard";

test("Render ProcessCard component", () => {
  const history = createMemoryHistory();

  const { container, getByTestId } = render(
    <Router history={history}>
      <ProcessCard
        processId={123456}
        title="Card Title"
        description="my description"
      />
    </Router>
  );

  const cardTitle = getByTestId("cardTitle");

  expect(cardTitle).toBeInTheDocument();

  const casesButton = getByTestId("casesButton");

  expect(casesButton).toBeInTheDocument();

  fireEvent.click(casesButton);

  const overridesButton = getByTestId("overridesButton");

  expect(overridesButton).toBeInTheDocument();

  fireEvent.click(overridesButton);

  const rulesButton = getByTestId("rulesButton");

  expect(rulesButton).toBeInTheDocument();

  fireEvent.click(rulesButton);

  expect(container).toHaveTextContent("Card Title");
  expect(container).toHaveTextContent("my description");
});
