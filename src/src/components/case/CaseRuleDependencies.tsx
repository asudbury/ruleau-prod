import React from "react";
import { Grid } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";

interface CaseRuleDependenciesProps {
  dependencies: any;
}

export default function CaseRuleDependencies({
  dependencies,
}: CaseRuleDependenciesProps): JSX.Element {
  function getRuleDescriptor(rule): string {
    return `${rule.id} - ${rule.name}`;
  }
  function getDependencies(runIf): JSX.Element {
    const items = dependencies.filter((item) => item.run_if === runIf);

    if (items.length > 0) {
      return (
        <div>
          {items.map((item) => (
            <span
              key={item.rule.id}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <SortIcon color="primary" />
              {getRuleDescriptor(item.rule)}
            </span>
          ))}
        </div>
      );
    }

    return <div>None</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        Depends On
      </Grid>
      <Grid item xs={11}>
        {getDependencies(false)}
      </Grid>
      <Grid item xs={1}>
        Run If
      </Grid>
      <Grid item xs={11}>
        {getDependencies(true)}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}
