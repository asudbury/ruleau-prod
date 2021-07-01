import React from "react";
import ReactRouter from "react-router";
import { fireEvent, render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Overrides from "./Overrides";
import { TestProcesses } from "../../testData/TestProcesses";
import { TestProcessCaseOverrides } from "../../testData/TestProcessCaseOverrides";

test("Test Process Overrides", () => {
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
    processCaseOverrides: {
      error: false,
      meta: {
        pending: false,
      },
      payload: TestProcessCaseOverrides,
    },
  };

  const store = mockStore(initialState);

  jest
    .spyOn(ReactRouter, "useParams")
    .mockReturnValue({ processName: "Platinum-Credit-Card" });

  const mockCaseSelected = jest.fn();

  const { getAllByTestId, getByTestId } = render(
    <Provider store={store}>
      <Overrides onCaseSelected={mockCaseSelected} />
    </Provider>
  );

  const overrides = getByTestId("processOverrides");
  expect(overrides).toBeInTheDocument();

  const createdAts = getAllByTestId("createdAt");
  expect(createdAts[0]).toBeInTheDocument();
  fireEvent.click(createdAts[0]);
});
