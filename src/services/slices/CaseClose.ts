import { createSlice } from "@reduxjs/toolkit";
import { caseClose, caseCloseThunks } from "./CaseCloseThunks";

export const caseCloseSlice = createSlice({
  name: "caseClose",
  initialState: {
    meta: { pending: false },
    payload: {},
    error: false,
  } as any,
  reducers: {},
  extraReducers: caseCloseThunks,
});

export { caseClose };
export default caseCloseSlice.reducer;
