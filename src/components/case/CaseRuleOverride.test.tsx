import React from "react";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import CaseRuleOverride from "./CaseRuleOverride";
import { TestCaseRuleOverrides } from "../../testData/TestCaseRuleOverrides";
import { TestCaseRuleOverridesMultiple } from "../../testData/TestCaseRuleOverridesMultiple";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initialState = {
  caseOverrides: {
    meta: { pending: false },
    payload: {},
    error: false,
  },
  caseOverrideUpdate: {
    error: false,
    meta: {
      pending: false,
    },
    payload: {},
  },
};

const mockUpdateOverride = jest.fn();
const mockOverrideUpdated = jest.fn();

let store = mockStore(initialState);

test("Render the Case Rule Override Has Override", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <CaseRuleOverride
        ruleId="rule001"
        onUpdateOverride={mockUpdateOverride}
        onOverrideUpdated={mockOverrideUpdated}
        data-testid="caseRuleOverride"
      />
    </Provider>
  );

  const overrideText = getByTestId("overrideText");

  expect(overrideText).toBeInTheDocument();

  const overrideButton = getByTestId("overrideButton");

  fireEvent.click(overrideButton);
});

test("Render the Case Rule Override No Override", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <CaseRuleOverride
        ruleId="rule001"
        onUpdateOverride={mockUpdateOverride}
        onOverrideUpdated={mockOverrideUpdated}
        data-testid="caseRuleOverride"
      />
    </Provider>
  );

  const overrideText = getByTestId("overrideText");

  expect(overrideText).toBeInTheDocument();
});

test("Render the Case Rule Remove Override", () => {
  initialState = {
    caseOverrides: {
      meta: { pending: false },
      payload: TestCaseRuleOverrides,
      error: false,
    },
    caseOverrideUpdate: {
      error: false,
      meta: {
        pending: false,
      },
      payload: {},
    },
  };

  store = mockStore(initialState);

  const { getByTestId } = render(
    <Provider store={store}>
      <CaseRuleOverride
        ruleId="rule001"
        onUpdateOverride={mockUpdateOverride}
        onOverrideUpdated={mockOverrideUpdated}
        data-testid="caseRuleOverride"
      />
    </Provider>
  );

  const overrideText = getByTestId("overrideText");

  expect(overrideText).toBeInTheDocument();
});

test("Render the Case Rule Remove Override Multiple", () => {
  initialState = {
    caseOverrides: {
      meta: { pending: false },
      payload: TestCaseRuleOverridesMultiple,
      error: false,
    },
    caseOverrideUpdate: {
      error: false,
      meta: {
        pending: false,
      },
      payload: {},
    },
  };

  store = mockStore(initialState);

  const { getByTestId } = render(
    <Provider store={store}>
      <CaseRuleOverride
        ruleId="rule001"
        onUpdateOverride={mockUpdateOverride}
        onOverrideUpdated={mockOverrideUpdated}
        data-testid="caseRuleOverride"
      />
    </Provider>
  );

  const overrideText = getByTestId("overrideText");

  expect(overrideText).toBeInTheDocument();
});
