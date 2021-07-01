import { useSelector } from "react-redux";
import { RootState } from "../stores";

export default function GetCaseCloseSelector(): any {
  return useSelector((reduxStore: RootState) => reduxStore.caseClose);
}
