/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";
import { FSA } from "../models/FluxStandardActions";

export const fsaPending = (state: FSA<any>): void => {
  state.meta.pending = true;
};

export const fsaFulfilled = (
  state: FSA<any>,
  action: PayloadAction<any>
): void => {
  state.meta.pending = false;
  state.payload = action.payload;
  state.error = false;
};

export const fsaRejected = (
  state: FSA<any>,
  action: PayloadAction<any>
): void => {
  state.error = true;
  state.meta.pending = false;
  state.payload = new Error(action.payload);
};
