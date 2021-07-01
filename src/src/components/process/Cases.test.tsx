import React from "react";
import ReactRouter from "react-router";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Cases from "./Cases";
import { TestProcesses } from "../../testData/TestProcesses";
import { TestCases } from "../../testData/TestCases";

test("Test Cases", () => {
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
    cases: {
      error: false,
      meta: {
        pending: false,
      },
      payload: TestCases,
    },
    caseClose: {
      error: false,
      meta: {
        pending: false,
      },
      payload: {},
    },
  };

  const store = mockStore(initialState);

  const mockCaseSelected = jest.fn();

  jest
    .spyOn(ReactRouter, "useParams")
    .mockReturnValue({ processName: "Platinum-Credit-Card" });

  const { getByTestId } = render(
    <Provider store={store}>
      <Cases onCaseSelected={mockCaseSelected} />
    </Provider>
  );

  const casesTableDiv = getByTestId("casesTableDiv");

  expect(casesTableDiv).toBeInTheDocument();
});
