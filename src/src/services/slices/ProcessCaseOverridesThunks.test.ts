import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchProcessCaseOverrides } from "./ProcessCaseOverridesThunks";

test("ProcessCaseOverrides", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const store = mockStore({});

  const processId = "a";

  fetchProcessCaseOverrides(processId);

  expect(store.getActions()).toEqual([]);
});
