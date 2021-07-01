import { caseCloseSlice } from "./CaseClose";

test("CaseCloseSlice", () => {
  const slices = caseCloseSlice;

  expect(slices.reducer).not.toBeNull();
  expect(slices.actions).not.toBeNull();
  expect(slices.caseReducers).not.toBeNull();
  expect(slices.name).not.toBeNull();
});
