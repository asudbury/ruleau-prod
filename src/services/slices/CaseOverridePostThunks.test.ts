import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { postCaseOverride } from "./CaseOverridePostThunks";

test("PostCaseOverride", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const store = mockStore({});

  const processId = "proc1";
  const id = "a";

  const payload = {
    rule_name: "ruleName",
    override_reason: "reason",
    applied: true,
  };

  postCaseOverride({ processId, id, payload });

  expect(store.getActions()).toEqual([]);
});
