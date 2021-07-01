import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import WarningIcon from "@material-ui/icons/Warning";
import DoneIcon from "@material-ui/icons/Done";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";
import { logDebug } from "../../utils/Logger";

const useStyles = makeStyles((theme) => ({
  warning: {
    color: theme.palette.warning.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  skipped: {
    color: theme.palette.text.secondary,
  },
}));

interface RuleAccordionProps {
  isRuleDefinition: boolean;
  hasWarning: boolean;
  ruleName: string;
  ruleDescription: string;
  ruleSubDescription: string;
  canBeOverriden: boolean;
  status: string;
}

export default function RuleAccordion({
  isRuleDefinition,
  hasWarning,
  ruleName,
  ruleDescription,
  ruleSubDescription,
  canBeOverriden,
  status,
}: RuleAccordionProps): JSX.Element {
  logDebug(
    "RuleAccordion",
    `Start ruleName=${ruleName} hasWarning=${hasWarning} canBeOverriden=${canBeOverriden}`
  );

  const classes = useStyles();

  function getIcon(): JSX.Element {
    if (status === "SKIPPED") {
      return <NotInterestedOutlinedIcon className={classes.skipped} />;
    }

    if (hasWarning && !canBeOverriden) {
      return <HighlightOffOutlinedIcon className={classes.error} />;
    }

    if (hasWarning && canBeOverriden) {
      return <WarningIcon className={classes.warning} />;
    }

    return <DoneIcon className={classes.success} />;
  }

  function isSkipped(): boolean {
    if (status === "SKIPPED") {
      return true;
    }

    return false;
  }

  function getDescription(): string {
    let description = ruleDescription;

    if (isSkipped()) {
      description += " (Skipped)";
    }

    return description;
  }

  return (
    <Grid container spacing={4} data-testid="ruleAccordion">
      {!isRuleDefinition && <Grid item>{getIcon()}</Grid>}
      {isRuleDefinition && (
        <Grid item>
          <SortIcon color="primary" />
        </Grid>
      )}
      <Grid item>
        <Typography
          variant="subtitle1"
          className={isSkipped() ? classes.skipped : ""}
        >
          {ruleName}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle1"
          className={isSkipped() ? classes.skipped : ""}
        >
          {getDescription()}
        </Typography>
        <Typography
          variant="body2"
          className={isSkipped() ? classes.skipped : ""}
        >
          {ruleSubDescription}
        </Typography>
        {!isRuleDefinition && hasWarning && !canBeOverriden && (
          <Typography variant="body2" className={classes.error}>
            This failure cannot be overridden
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
