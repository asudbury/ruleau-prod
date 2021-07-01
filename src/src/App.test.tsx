import React from "react";
import { fireEvent, render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import { TestProcesses } from "./testData/TestProcesses";

test("Render the App", () => {
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

  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const dashboard = getByTestId("dashboard");

  expect(dashboard).toBeInTheDocument();

  const homePageIcon = getByTestId("homePageIcon");

  expect(homePageIcon).toBeInTheDocument();

  fireEvent.click(homePageIcon);
});
