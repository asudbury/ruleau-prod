import { createSlice } from "@reduxjs/toolkit";
import { FSA } from "../models/FluxStandardActions";
import { ProcessRulesModel } from "../models/ProcessRulesModel";
import { fetchProcessRules, processRulesThunks } from "./ProcessRulesThunks";

export const processRulesSlice = createSlice({
  name: "processRules",
  initialState: {
    meta: { pending: false },
    payload: [],
    error: false,
  } as FSA<ProcessRulesModel>,
  reducers: {},
  extraReducers: processRulesThunks,
});

export { fetchProcessRules };
export default processRulesSlice.reducer;
