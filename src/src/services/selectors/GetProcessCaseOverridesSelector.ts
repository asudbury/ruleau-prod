import { useSelector } from "react-redux";
import { ProcessCaseOverridesModel } from "../models/ProcessCaseOverridesModel";
import { RootState } from "../stores";

// eslint-disable-next-line max-len
export default function GetProcessCaseOverridesSelector(): ProcessCaseOverridesModel {
  return useSelector(
    (reduxStore: RootState) => reduxStore.processCaseOverrides
  );
}
