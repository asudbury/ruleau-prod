/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Endpoints from "../constants/Endpoints";
import API from "../api";
import { fsaFulfilled, fsaPending, fsaRejected } from "../core/FsaActions";
import { logDebug } from "../../utils/Logger";

export const fetchProcesses = createAsyncThunk(
  "processes/fetchProcesses",
  async () => {
    logDebug("ProcessesThunks", "");
    const result = await new API(Endpoints.PROCESSES).fetch();
    return result.data;
  }
);

export const processesThunks = {
  [fetchProcesses.pending.toString()]: (state) => fsaPending(state),
  [fetchProcesses.fulfilled.toString()]: (state, action) =>
    fsaFulfilled(state, action),
  [fetchProcesses.rejected.toString()]: (state, action) =>
    fsaRejected(state, action),
};
