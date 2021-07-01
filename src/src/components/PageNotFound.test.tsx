import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render } from "@testing-library/react";
import PageNotFound from "./PageNotFound";

test("Render PageNotFound component", () => {
  const history = createMemoryHistory();

  const { container, getByTestId } = render(
    <Router history={history}>
      <PageNotFound />
    </Router>
  );

  const goHomeButton = getByTestId("goHomeButton");

  expect(goHomeButton).toBeInTheDocument();

  fireEvent.click(goHomeButton);

  expect(container).toHaveTextContent("Sorry");
  expect(container).toHaveTextContent("find the page you were looking for");
});
