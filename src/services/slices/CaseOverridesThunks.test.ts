import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchCaseOverrides } from "./CaseOverridesThunks";

test("CaseOverrides", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const store = mockStore({});

  const processId = "proc";
  const id = "a";

  fetchCaseOverrides({ processId, id });

  expect(store.getActions()).toEqual([]);
});
