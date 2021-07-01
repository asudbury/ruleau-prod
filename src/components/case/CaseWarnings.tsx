import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import CaseWarning from "./CaseWarning";
import { logDebug } from "../../utils/Logger";

const useStyles = makeStyles((theme) => ({
  customBorder: {
    border: `3px solid ${theme.palette.warning.main}`,
    borderRadius: 15,
  },
}));

interface CaseWarningsProps {
  warningRules: any;
  onWarningSelected: (ruleName: string) => void;
}

export default function CaseWarnings({
  warningRules,
  onWarningSelected,
}: CaseWarningsProps): JSX.Element {
  const classes = useStyles();

  logDebug("CaseWarnings", `Start warningsCount=${warningRules.length}`);

  function handleRuleWarningSelected(rule: string) {
    logDebug("CaseWarnings", `handleRuleWarningSelected rule=${rule}`);
    onWarningSelected(rule);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.customBorder}>
          <Box border="5" borderColor="warning.main">
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom>
                  The following rules require attention:
                </Typography>

                {warningRules.map((warning) => (
                  <CaseWarning
                    key={warning.rule_version.id}
                    ruleName={warning.rule_version.rule}
                    ruleDescription={warning.rule_version.name}
                    onRuleWarningSelected={handleRuleWarningSelected}
                  />
                ))}
              </CardContent>
            </Card>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
