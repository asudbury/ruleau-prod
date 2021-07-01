/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import CaseDetails from "./CaseDetails";
import { TestCases } from "../../testData/TestCases";
import { TestCase } from "../../testData/TestCase";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function getInitialState(caseCloseErrorState) {
  return {
    cases: {
      error: false,
      meta: {
        pending: false,
      },
      payload: TestCases,
    },
    caseClose: {
      error: caseCloseErrorState,
      meta: {
        pending: false,
      },
      payload: {},
    },
  };
}

const mockWarningSelected = jest.fn();
const mockCaseClose = jest.fn();

test("Render the Case Details", () => {
  const initialState = getInitialState(false);

  const store = mockStore(initialState);

  const { getByTestId } = render(
    <Provider store={store}>
      <CaseDetails
        caseDetails={TestCase}
        onWarningSelected={mockWarningSelected}
        onCaseClose={mockCaseClose}
      />
    </Provider>
  );

  const caseTestDetails = getByTestId("caseDetails");

  expect(caseTestDetails).toBeInTheDocument();

  const closeCaseButton = getByTestId("closeCaseButton");

  expect(closeCaseButton).toBeInTheDocument();

  jest.useFakeTimers();

  fireEvent.click(closeCaseButton);

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

  jest.runAllTimers();

  expect(mockCaseClose).toBeCalled();
});

test("Test Error state", () => {
  const initialState = getInitialState(true);
  const store = mockStore(initialState);

  const { getByTestId } = render(
    <Provider store={store}>
      <CaseDetails
        caseDetails={TestCase}
        onWarningSelected={mockWarningSelected}
        onCaseClose={mockCaseClose}
      />
    </Provider>
  );

  const closeCaseButton = getByTestId("closeCaseButton");

  expect(closeCaseButton).toBeInTheDocument();

  fireEvent.click(closeCaseButton);
});
