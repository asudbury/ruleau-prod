import { createSlice } from "@reduxjs/toolkit";
import { FSA } from "../models/FluxStandardActions";
import { ProcessCaseOverridesModel } from "../models/ProcessCaseOverridesModel";
import {
  fetchProcessCaseOverrides,
  processCaseOverridesThunks,
} from "./ProcessCaseOverridesThunks";

export const processCaseOverridesSlice = createSlice({
  name: "processCaseOverrides",
  initialState: {
    meta: { pending: false },
    payload: [],
    error: false,
  } as FSA<ProcessCaseOverridesModel>,
  reducers: {},
  extraReducers: processCaseOverridesThunks,
});

export { fetchProcessCaseOverrides };
export default processCaseOverridesSlice.reducer;
