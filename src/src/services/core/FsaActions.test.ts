import { PayloadAction } from "@reduxjs/toolkit";
import { FSA } from "../models/FluxStandardActions";
import { fsaFulfilled, fsaPending, fsaRejected } from "./FsaActions";

test("FSA Pending", () => {
  const state: FSA<unknown> = {
    meta: { pending: false },
    payload: null,
    error: false,
  };

  fsaPending(state);

  expect(state.meta.pending).toEqual(true);
});

test("FSA Fulfilled", () => {
  const state: FSA<unknown> = {
    meta: { pending: false },
    payload: null,
    error: false,
  };

  const action: PayloadAction<unknown> = {
    payload: "hello",
    type: "1",
  };

  fsaFulfilled(state, action);

  expect(state.error).toEqual(false);
  expect(state.meta.pending).toEqual(false);
  expect(state.payload).toEqual("hello");
});

test("FSA Rejected", () => {
  const state: FSA<unknown> = {
    meta: { pending: true },
    payload: null,
    error: false,
  };

  const action: PayloadAction<string> = {
    payload: "hello",
    type: "1",
  };

  fsaRejected(state, action);

  expect(state.error).toEqual(true);
  expect(state.meta.pending).toEqual(false);
  expect(state.payload).toEqual(new Error(action.payload));
});
