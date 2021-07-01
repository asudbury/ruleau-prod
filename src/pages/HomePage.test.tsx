import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";
import { TestProcesses } from "../testData/TestProcesses";

test("Render the Home Page", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const initialState = {
    processes: {
      error: false,
      meta: {
        pending: false,
      },
      payload: TestProcesses,
    },
  };

  const store = mockStore(initialState);
  const history = createMemoryHistory();
  const route = "/whatever-the-route-is";
  history.push(route);

  const { getByTestId } = render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );

  const dashboard = getByTestId("dashboard");

  expect(dashboard).toBeInTheDocument();
});
