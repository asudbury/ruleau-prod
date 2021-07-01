/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Endpoints from "../constants/Endpoints";
import API from "../api";
import { fsaFulfilled, fsaPending, fsaRejected } from "../core/FsaActions";
import { logDebug } from "../../utils/Logger";

export const fetchProcessRules = createAsyncThunk(
  "process/rules",
  async (processId: string) => {
    logDebug("ProcessRulesThunks", `processId=${processId}`);
    const result = await new API(Endpoints.PROCESS_RULES)
      .tokenise(processId)
      .fetch();
    return result.data;
  }
);

export const processRulesThunks = {
  [fetchProcessRules.pending.toString()]: (state) => fsaPending(state),
  [fetchProcessRules.fulfilled.toString()]: (state, action) =>
    fsaFulfilled(state, action),
  [fetchProcessRules.rejected.toString()]: (state, action) =>
    fsaRejected(state, action),
};
