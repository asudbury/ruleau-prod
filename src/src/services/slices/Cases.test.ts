import { casesSlice } from "./Cases";

test("CasesSlice", () => {
  const slices = casesSlice;

  expect(slices.reducer).not.toBeNull();
  expect(slices.actions).not.toBeNull();
  expect(slices.caseReducers).not.toBeNull();
  expect(slices.name).not.toBeNull();
});
