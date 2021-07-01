import { createSlice } from "@reduxjs/toolkit";
import { CasesModel } from "../models/CasesModel";
import { FSA } from "../models/FluxStandardActions";
import { fetchCases, casesThunks } from "./CasesThunks";

export const casesSlice = createSlice({
  name: "cases",
  initialState: {
    meta: { pending: false },
    payload: {},
    error: false,
  } as FSA<CasesModel>,
  reducers: {},
  extraReducers: casesThunks,
});

export { fetchCases };
export default casesSlice.reducer;
