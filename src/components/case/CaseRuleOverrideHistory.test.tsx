import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import CaseRuleOverrideHistory from "./CaseRuleOverrideHistory";
import { TestCaseRuleOverrides } from "../../testData/TestCaseRuleOverrides";
import { TestCaseRuleUpdateOverride } from "../../testData/TestCaseRuleUpdateOverride";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test("Case Rule Override History Empty", () => {
  const initialState = {
    caseOverrides: {
      meta: { pending: false },
      payload: {},
      error: false,
    },
  };

  const store = mockStore(initialState);

  const { queryByTestId } = render(
    <Provider store={store}>
      <CaseRuleOverrideHistory ruleId="rule001" canOverride />
    </Provider>
  );

  const overrideHistory = queryByTestId("caseRuleOverrideHistory");

  expect(overrideHistory).not.toBeInTheDocument();
});

test("Case Rule Override History", () => {
  const initialState = {
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
      payload: TestCaseRuleUpdateOverride,
    },
  };

  const store = mockStore(initialState);

  const { container, getByTestId } = render(
    <Provider store={store}>
      <CaseRuleOverrideHistory ruleId="rule001" canOverride />
    </Provider>
  );

  const overrideHistory = getByTestId("caseRuleOverrideHistory");

  expect(overrideHistory).toBeInTheDocument();

  expect(container).toHaveTextContent("test override reason 1");
  expect(container).toHaveTextContent("test override reason 2");
  expect(container).toHaveTextContent("test override reason 3");
});
