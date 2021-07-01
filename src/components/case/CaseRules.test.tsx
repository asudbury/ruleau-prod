import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import CaseRules from "./CaseRules";
import { TestCase } from "../../testData/TestCase";

test("Render the Case Rules", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const initialState = {
    cases: {
      error: false,
      meta: {
        pending: false,
      },
      payload: {},
    },
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

  const store = mockStore(initialState);

  const mockUpdateOverride = jest.fn();
  const mockOverrideUpdated = jest.fn();

  const { container, getByTestId } = render(
    <Provider store={store}>
      <CaseRules
        caseStatus="OPEN"
        rules={TestCase.rules}
        warningSelected=""
        onUpdateOverride={mockUpdateOverride}
        onOverrideUpdated={mockOverrideUpdated}
      />
    </Provider>
  );

  const caseRule = getByTestId("caseRules");

  expect(caseRule).toBeInTheDocument();

  expect(container).toHaveTextContent("rul_top");
  expect(container).toHaveTextContent("top");
  expect(container).toHaveTextContent("A top level rule");
  expect(container).toHaveTextContent("rul_mid");
  expect(container).toHaveTextContent("sub");
  expect(container).toHaveTextContent("A rule nested in the top level");
  expect(container).toHaveTextContent("rul_bot");
  expect(container).toHaveTextContent("sub_sub");
  expect(container).toHaveTextContent("A rule nested in a nested rule");
});
