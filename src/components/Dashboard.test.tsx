import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { TestProcesses } from "../testData/TestProcesses";

test("Render Dashboard", () => {
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

  const { container, getByTestId } = render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );

  const dashboard = getByTestId("dashboard");

  expect(dashboard).toBeInTheDocument();

  expect(container).toHaveTextContent("Ruleau Dashboard");
  expect(container).toHaveTextContent("My Processes");
});
