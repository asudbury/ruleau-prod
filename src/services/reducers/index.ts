import { combineReducers } from "redux";
import {
  processesReducer,
  processCaseOverridesReducer,
  processRulesReducer,
  casesReducer,
  caseCloseReducer,
  caseOverridesReducer,
  caseOverrideUpdateReducer,
} from "../slices";

export default combineReducers({
  processes: processesReducer,
  processCaseOverrides: processCaseOverridesReducer,
  processRules: processRulesReducer,
  cases: casesReducer,
  caseClose: caseCloseReducer,
  caseOverrides: caseOverridesReducer,
  caseOverrideUpdate: caseOverrideUpdateReducer,
});
