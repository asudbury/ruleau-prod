import React from "react";
import { Grid } from "@material-ui/core";
import LabelAndValue from "../core/LabelAndValue";
import { logDebug } from "../../utils/Logger";

interface RuleDetailsProps {
  rule: any;
}

export default function RuleDetails({ rule }: RuleDetailsProps): JSX.Element {
  logDebug("RuleDetails", "Start");

  function getOverrideLevelDescription() {
    if (rule.current_version.override_level === 1) {
      return "Override Allowed";
    }
    if (rule.current_version.override_level === 2) {
      return "No Override";
    }
    return rule.current_version.override_level;
  }

  function getDependantRules() {
    if (
      rule.current_version.dependencies &&
      rule.current_version.dependencies.length > 0
    ) {
      const { dependencies } = rule.current_version;
      // eslint-disable-next-line no-shadow
      return dependencies.map((dependent) => dependent.rule).join(", ");
    }
    return "None";
  }

  return (
    <Grid container spacing={1} data-testid="ruleDetails">
      <Grid item xs={12} data-testid="overrideLevel">
        <LabelAndValue
          label="Override Level"
          value={getOverrideLevelDescription()}
          variant="body2"
        />
      </Grid>
      <Grid item xs={12} data-testid="ruleDependencies">
        <LabelAndValue
          label="Rule Dependencies"
          value={getDependantRules()}
          variant="body2"
        />
      </Grid>
    </Grid>
  );
}
