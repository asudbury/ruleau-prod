import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchCases } from "./CasesThunks";

test("FetchCases", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const store = mockStore({});

  fetchCases("1");

  expect(store.getActions()).toEqual([]);
});
