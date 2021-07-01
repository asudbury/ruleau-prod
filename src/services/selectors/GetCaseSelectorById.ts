import { CaseModel } from "../models/CasesModel";
import GetCasesSelector from "./GetCasesSelector";

export default function GetCaseSelectorById(id: string): CaseModel | null {
  const cases = GetCasesSelector();

  if (cases.payload) {
    if (Array.isArray(cases.payload)) {
      return cases.payload.find((item) => {
        return item.id === id;
      });
    }
  }

  return null;
}
