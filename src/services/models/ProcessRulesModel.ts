/* eslint-disable camelcase */
import { FSAMeta } from "./FluxStandardActions";

export interface ProcessRulesModel {
  meta: FSAMeta;
  error: boolean;
  payload: PayloadModel | Error | string | any;
}

export interface ProcessRuleModel {
  id: string;
  name: string;
  description: string;
  override_level: string;
  parameters: any;
}

export interface PayloadModel {
  data: Array<ProcessRuleModel>;
}
