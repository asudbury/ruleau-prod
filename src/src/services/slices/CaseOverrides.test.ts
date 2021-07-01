import { caseOverridesSlice } from "./CaseOverrides";

test("CaseOverridesSlice", () => {
  const slice = caseOverridesSlice;

  expect(slice.reducer).not.toBeNull();
  expect(slice.actions).not.toBeNull();
  expect(slice.caseReducers).not.toBeNull();
  expect(slice.name).not.toBeNull();
});
