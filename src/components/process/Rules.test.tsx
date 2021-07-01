import React from "react";
import ReactRouter from "react-router";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Rules from "./Rules";
import { TestProcesses } from "../../testData/TestProcesses";
import { TestRules } from "../../testData/TestRules";

test("Test Rules", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const initialState = {
    processes: {
      error: false,
      meta: {
        pending: false,
      },
      payload: TestProcesses,
    },
    processRules: {
      error: false,
      meta: {
        pending: false,
      },
      payload: TestRules,
    },
  };

  const store = mockStore(initialState);

  jest
    .spyOn(ReactRouter, "useParams")
    .mockReturnValue({ processName: "Platinum-Credit-Card" });

  const { getByTestId } = render(
    <Provider store={store}>
      <Rules />
    </Provider>
  );

  const rules = getByTestId("rules");

  expect(rules).toBeInTheDocument();
});
