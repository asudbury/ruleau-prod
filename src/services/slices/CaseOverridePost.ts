import { createSlice } from "@reduxjs/toolkit";
import {
  postCaseOverride,
  caseOverridePostThunks,
} from "./CaseOverridePostThunks";

export const caseOverridePostSlice = createSlice({
  name: "caseOverridePost",
  initialState: {
    meta: { pending: false },
    payload: {},
    error: false,
  } as any,
  reducers: {},
  extraReducers: caseOverridePostThunks,
});

export { postCaseOverride };
export default caseOverridePostSlice.reducer;
