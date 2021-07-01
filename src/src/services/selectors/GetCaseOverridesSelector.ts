import { useSelector } from "react-redux";
import { RootState } from "../stores";

export default function GetCaseOverridesSelector(): any {
  return useSelector((reduxStore: RootState) => reduxStore.caseOverrides);
}
