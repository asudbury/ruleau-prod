/* eslint-disable camelcase */
import { FSAMeta } from "./FluxStandardActions";

export interface CasesModel {
  meta: FSAMeta;
  error: boolean;
  payload: PayloadModel | Error | string | any;
}

export interface CaseModel {
  id: string;
  result: string;
  created_at: string;
  status: string;
  rules: any;
}

export interface PayloadModel {
  data: Array<CaseModel>;
}
