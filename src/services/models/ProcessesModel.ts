/* eslint-disable camelcase */
import { FSAMeta } from "./FluxStandardActions";

export interface ProcessesModel {
  meta: FSAMeta;
  error: boolean;
  payload: PayloadModel | Error | string | any;
}

export interface ProcessModel {
  id: string;
  name: string;
}

export interface PayloadModel {
  data: Array<ProcessModel>;
}
