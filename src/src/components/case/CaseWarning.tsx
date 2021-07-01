/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Grid, Link, makeStyles, Typography } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import { logDebug } from "../../utils/Logger";

interface CaseWarningProps {
  ruleName: string;
  ruleDescription: string;
  onRuleWarningSelected: (ruleName: string) => void;
}

const useStyles = makeStyles((theme) => ({
  box: {
    borderColor: theme.palette.warning.main,
  },
  warning: {
    color: theme.palette.warning.main,
    textDecoration: "underline",
  },
}));

export default function CaseWarning({
  ruleName,
  ruleDescription,
  onRuleWarningSelected,
}: CaseWarningProps): JSX.Element {
  logDebug("CaseWarning", `Start rule=${ruleName}`);

  function handleRuleWarningSelected() {
    logDebug("CaseWarning", `handleRuleWarningSelected rule=${ruleName}`);

    onRuleWarningSelected(ruleName);
  }

  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Grid container spacing={4}>
        <Grid item>
          <WarningIcon className={classes.warning} />
        </Grid>
        <Grid item>
          <Link
            href="#"
            className={classes.warning}
            onClick={handleRuleWarningSelected}
          >
            <Typography className={classes.warning}>{ruleName}</Typography>
          </Link>
        </Grid>
        {ruleDescription && (
          <Grid item>
            <Link
              href="#"
              className={classes.warning}
              onClick={handleRuleWarningSelected}
            >
              <Typography className={classes.warning}>
                {ruleDescription}
              </Typography>
            </Link>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
