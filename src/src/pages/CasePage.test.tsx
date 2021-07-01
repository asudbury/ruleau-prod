import React from "react";
import ReactRouter from "react-router";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import CasePage from "./CasePage";
import { TestCases } from "../testData/TestCases";

test("Render the Case Page", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const initialState = {
    cases: {
      error: false,
      meta: {
        pending: false,
      },
      payload: TestCases,
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
    caseClose: {
      error: false,
      meta: {
        pending: false,
      },
      payload: {},
    },
  };

  const store = mockStore(initialState);

  jest
    .spyOn(ReactRouter, "useParams")
    .mockReturnValue({ caseId: "1838a3ef-6257-491f-a7d3-30ab38b5cd1a" });

  render(
    <Provider store={store}>
      <CasePage />
    </Provider>
  );
});
