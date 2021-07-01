import GetCaseOverridesSelector from "./GetCaseOverridesSelector";

export default function GetCaseHasErrorsSelector(): boolean {
  const overrides = GetCaseOverridesSelector();

  return overrides.error === true;
}
