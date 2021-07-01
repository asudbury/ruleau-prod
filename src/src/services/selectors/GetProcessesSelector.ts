import { useSelector } from "react-redux";
import { ProcessesModel } from "../models/ProcessesModel";
import { RootState } from "../stores";

export default function GetProcessSelector(): ProcessesModel {
  return useSelector((reduxStore: RootState) => reduxStore.processes);
}
