import GetCaseRulesOverridesSelector from "../services/selectors/GetCaseRulesOverridesSelector";

interface OverrideState {
  label: string;
  buttonLabel: string;
  reasonText: string;
  applied: boolean;
  saveErrorMessage: string;
  saveMessage: string;
  loadErrorMessage: string;
}

export default function useCaseRuleOverride(ruleId: string): any {
  const state: OverrideState = {
    label: "Override Reason",
    buttonLabel: "Save Override",
    reasonText: "You need to enter a reason for the override.",
    applied: true,
    saveErrorMessage: "There has been an error saving the override.",
    saveMessage: "The override has been saved.",
    loadErrorMessage:
      "There has been a problem loading the overrides, Override functionality disabled.",
  };

  let hasOverride = false;

  const overrides = GetCaseRulesOverridesSelector(ruleId);
  let lastOverride;

  if (overrides.length === 1) {
    [lastOverride] = overrides;
  } else if (overrides.length > 1) {
    lastOverride = overrides.reduce((a, b) =>
      a.created_at > b.created_at ? a : b
    );
  }

  if (lastOverride) {
    hasOverride = lastOverride.applied;
  }

  if (hasOverride) {
    state.label = "Removal Reason";
    state.buttonLabel = "Remove Override";
    state.reasonText =
      "You need to enter a reason for the removal of the override.";
    state.applied = false;
    state.saveErrorMessage = "There has been an error removing the override.";
  }

  return { state };
}
