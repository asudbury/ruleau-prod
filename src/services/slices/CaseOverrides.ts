import { createSlice } from "@reduxjs/toolkit";
import { fetchCaseOverrides, caseOverridesThunks } from "./CaseOverridesThunks";

export const caseOverridesSlice = createSlice({
  name: "caseOverrides",
  initialState: {
    meta: { pending: false },
    payload: {},
    error: false,
  } as any,
  reducers: {},
  extraReducers: caseOverridesThunks,
});

export { fetchCaseOverrides };
export default caseOverridesSlice.reducer;
