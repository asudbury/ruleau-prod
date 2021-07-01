import GetCaseOverridesSelector from "./GetCaseOverridesSelector";

export default function GetCaseRulesOverridesSelector(ruleId: string): any {
  const overrides = GetCaseOverridesSelector();

  if (overrides.payload) {
    if (Array.isArray(overrides.payload)) {
      return overrides.payload.filter((item) => item.rule === ruleId);
    }
    return [];
  }

  return [];
}
