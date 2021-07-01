/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Endpoints from "../constants/Endpoints";
import API from "../api";
import { fsaFulfilled, fsaPending, fsaRejected } from "../core/FsaActions";
import { logDebug } from "../../utils/Logger";

export const fetchProcessCaseOverrides = createAsyncThunk(
  "processCase/overrides",
  async (processId: string) => {
    logDebug("ProcessCaseOverridesThunks", `processId=${processId}`);
    const result = await new API(Endpoints.PROCESS_OVERRIDES)
      .tokenise(processId)
      .fetch();
    return result.data;
  }
);

export const processCaseOverridesThunks = {
  [fetchProcessCaseOverrides.pending.toString()]: (state) => fsaPending(state),
  [fetchProcessCaseOverrides.fulfilled.toString()]: (state, action) =>
    fsaFulfilled(state, action),
  [fetchProcessCaseOverrides.rejected.toString()]: (state, action) =>
    fsaRejected(state, action),
};
