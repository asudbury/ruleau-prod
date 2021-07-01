/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Endpoints from "../constants/Endpoints";
import API from "../api";
import { fsaFulfilled, fsaPending, fsaRejected } from "../core/FsaActions";
import { logDebug } from "../../utils/Logger";

export const fetchCaseOverrides = createAsyncThunk(
  "case/overrides",
  async ({ processId, id }: { processId: any; id: any }) => {
    logDebug("CaseOverridesThunks", `processId=${processId} id=${id}`);
    const result = await new API(Endpoints.CASE_OVERRIDES)
      .tokenise(processId)
      .tokenise(id)
      .fetch();
    return result.data;
  }
);

export const caseOverridesThunks = {
  [fetchCaseOverrides.pending.toString()]: (state) => fsaPending(state),
  [fetchCaseOverrides.fulfilled.toString()]: (state, action) =>
    fsaFulfilled(state, action),
  [fetchCaseOverrides.rejected.toString()]: (state, action) =>
    fsaRejected(state, action),
};
