import { caseOverridePostSlice } from "./CaseOverridePost";

test("CaseOverridePostSlice", () => {
  const slices = caseOverridePostSlice;

  expect(slices.reducer).not.toBeNull();
  expect(slices.actions).not.toBeNull();
  expect(slices.caseReducers).not.toBeNull();
  expect(slices.name).not.toBeNull();
});
