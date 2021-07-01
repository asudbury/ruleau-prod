/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Endpoints from "../constants/Endpoints";
import API from "../api";
import { fsaFulfilled, fsaPending, fsaRejected } from "../core/FsaActions";
import { logDebug } from "../../utils/Logger";

export const fetchCases = createAsyncThunk(
  "cases/fetchCases",
  async (processId: string) => {
    logDebug("CaseThunks", `processId=${processId}`);
    const result = await new API(Endpoints.CASES).tokenise(processId).fetch();
    return result.data;
  }
);

export const casesThunks = {
  [fetchCases.pending.toString()]: (state) => fsaPending(state),
  [fetchCases.fulfilled.toString()]: (state, action) =>
    fsaFulfilled(state, action),
  [fetchCases.rejected.toString()]: (state, action) =>
    fsaRejected(state, action),
};
