import { useSelector } from "react-redux";
import { RootState } from "../stores";

// eslint-disable-next-line max-len
export default function GetProcessRulesSelector(): any {
  return useSelector((reduxStore: RootState) => reduxStore.processRules);
}
