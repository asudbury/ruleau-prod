/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Endpoints from "../constants/Endpoints";
import API from "../api";
import { fsaFulfilled, fsaPending, fsaRejected } from "../core/FsaActions";
import { logDebug } from "../../utils/Logger";

export const postCaseOverride = createAsyncThunk(
  "case/updateOverride",
  async ({
    processId,
    id,
    payload,
  }: {
    processId: any;
    id: any;
    payload: any;
  }) => {
    logDebug(
      "CaseOverridePostThunks",
      `processId=${processId} id=${id} payload=${payload}`
    );
    const result = await new API(Endpoints.CASE_OVERRIDES)
      .tokenise(processId)
      .tokenise(id)
      .post(payload);
    return result.data;
  }
);

export const caseOverridePostThunks = {
  [postCaseOverride.pending.toString()]: (state) => fsaPending(state),
  [postCaseOverride.fulfilled.toString()]: (state, action) =>
    fsaFulfilled(state, action),
  [postCaseOverride.rejected.toString()]: (state, action) =>
    fsaRejected(state, action),
};
