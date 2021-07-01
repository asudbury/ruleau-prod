import { useSelector } from "react-redux";
import { CasesModel } from "../models/CasesModel";
import { RootState } from "../stores";

export default function GetCasesSelector(): CasesModel {
  return useSelector((reduxStore: RootState) => reduxStore.cases);
}
