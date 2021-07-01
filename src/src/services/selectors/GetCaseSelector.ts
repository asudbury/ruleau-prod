import { CaseModel } from "../models/CasesModel";
import GetCasesSelector from "./GetCasesSelector";

export default function GetCaseSelector(caseId: string): CaseModel | null {
  const cases = GetCasesSelector();

  if (cases.payload) {
    if (Array.isArray(cases.payload)) {
      return cases.payload.find((item) => {
        return item.id === caseId;
      });
    }
  }

  return null;
}
