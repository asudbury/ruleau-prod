import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { fireEvent, render } from "@testing-library/react";
import ProcessList from "./ProcessList";
import { TestProcesses } from "../testData/TestProcesses";

test("Render Process List", () => {
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
  };

  const store = mockStore(initialState);

  const { container, getByTestId } = render(
    <Provider store={store}>
      <ProcessList />
    </Provider>
  );

  const processList = getByTestId("processList");

  expect(processList).toBeInTheDocument();

  const processListItem = getByTestId("processListItem");

  expect(processListItem).toBeInTheDocument();

  fireEvent.click(processListItem);

  const menu = getByTestId("menu");

  expect(menu).toBeInTheDocument();

  const menuItem = getByTestId("menuItem1");

  expect(menuItem).toBeInTheDocument();

  fireEvent.click(menuItem);

  expect(container).toHaveTextContent("Process");
});
