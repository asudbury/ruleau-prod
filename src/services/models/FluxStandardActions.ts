/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FSAMeta {
  pending: boolean;
}
export interface FSA<T> {
  meta: FSAMeta;
  payload: T | Error | any;
  error: boolean;
  type?: string;
  states?: any;
}
