import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render } from "@testing-library/react";
import AppBreadCrumbs, { Page } from "./AppBreadcrumbs";

test("Render AppBreadCrumbs component", () => {
  const history = createMemoryHistory();
  const pushSpy = jest.spyOn(history, "push");

  const { getByTestId } = render(
    <Router history={history}>
      <AppBreadCrumbs page={Page.CasePage} />
    </Router>
  );

  const goHomeButton = getByTestId("goHome");

  expect(goHomeButton).toBeInTheDocument();

  fireEvent.click(goHomeButton);

  expect(pushSpy).toHaveBeenCalled();

  const goToProcess = getByTestId("goToProcess");

  expect(goToProcess).toBeInTheDocument();

  fireEvent.click(goToProcess);

  expect(pushSpy).toHaveBeenCalled();
});
