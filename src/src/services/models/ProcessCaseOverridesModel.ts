/* eslint-disable camelcase */
import { FSAMeta } from "./FluxStandardActions";

export interface ProcessCaseOverridesModel {
  meta: FSAMeta;
  error: boolean;
  payload: PayloadModel | Error | string | any;
}

export interface ProcessCaseOverrideModel {
  id: string;
  case_id: string;
  rule_name: string;
  override_reason: string;
  applied: boolean;
  created_at: string;
}

export interface PayloadModel {
  data: Array<ProcessCaseOverrideModel>;
}
