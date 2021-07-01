import { useSelector } from "react-redux";
import { RootState } from "../stores";

export default function GetCaseOverrideUpdateSelector(): any {
  return useSelector((reduxStore: RootState) => reduxStore.caseOverrideUpdate);
}
