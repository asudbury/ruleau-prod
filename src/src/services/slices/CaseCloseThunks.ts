/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Endpoints from "../constants/Endpoints";
import API from "../api";
import { fsaFulfilled, fsaPending, fsaRejected } from "../core/FsaActions";
import { logDebug } from "../../utils/Logger";

export const caseClose = createAsyncThunk(
  "case/close",
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
      "CaseCloseThunks",
      `processId=${processId} id=${id} payload=${payload}`
    );
    const result = await new API(Endpoints.CASE)
      .tokenise(processId)
      .tokenise(id)
      .patch(payload);
    return result.data;
  }
);

export const caseCloseThunks = {
  [caseClose.pending.toString()]: (state) => fsaPending(state),
  [caseClose.fulfilled.toString()]: (state, action) =>
    fsaFulfilled(state, action),
  [caseClose.rejected.toString()]: (state, action) =>
    fsaRejected(state, action),
};
