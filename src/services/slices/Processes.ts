import { createSlice } from "@reduxjs/toolkit";
import { FSA } from "../models/FluxStandardActions";
import { fetchProcesses, processesThunks } from "./ProcessesThunks";
import { ProcessesModel } from "../models/ProcessesModel";

export const processesSlice = createSlice({
  name: "processes",
  initialState: {
    meta: { pending: false },
    payload: [],
    error: false,
  } as FSA<ProcessesModel>,
  reducers: {},
  extraReducers: processesThunks,
});

export { fetchProcesses };
export default processesSlice.reducer;
