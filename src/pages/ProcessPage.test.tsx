import React from "react";
import ReactRouter from "react-router";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import { fireEvent, render } from "@testing-library/react";
import ProcessPage from "./ProcessPage";
import { TestProcesses } from "../testData/TestProcesses";

test("Render the Process Page", () => {
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
    cases: {
      error: false,
      meta: {
        pending: false,
      },
    },
  };

  const store = mockStore(initialState);
  const history = createMemoryHistory();
  const route = "/whatever-the-route-is";
  history.push(route);

  jest
    .spyOn(ReactRouter, "useParams")
    .mockReturnValue({ processName: "Platinum-Credit-Card" });

  const { getByTestId } = render(
    <Provider store={store}>
      <ProcessPage />
    </Provider>
  );

  const casesTab = getByTestId("casesTab");

  expect(casesTab).toBeInTheDocument();

  fireEvent.click(casesTab);
});
