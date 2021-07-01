import React from "react";
import configureStore from "redux-mock-store";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import LogViewer from "./LogViewer";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
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

(window as any).store = store;

test("Render LogViewer", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <LogViewer />
    </Provider>
  );

  const copyToClipboard = getByTestId("copyToClipboard");

  expect(copyToClipboard).toBeInTheDocument();

  fireEvent.click(copyToClipboard);

  const clearLog = getByTestId("clearLog");

  expect(clearLog).toBeInTheDocument();

  fireEvent.click(clearLog);
});
