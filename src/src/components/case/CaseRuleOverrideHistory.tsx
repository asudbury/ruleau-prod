import React from "react";
import {
  makeStyles,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Badge,
  Box,
} from "@material-ui/core";
import { format } from "date-fns";
import SubjectIcon from "@material-ui/icons/Subject";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { Alert } from "@material-ui/lab";
import GetCaseRulesOverridesSelector from "../../services/selectors/GetCaseRulesOverridesSelector";
import GetCaseOverrideUpdateSelector from "../../services/selectors/GetCaseOverrideUpdateSelector";

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  nowrap: {
    display: "flex",
    whiteSpace: "nowrap",
    overflow: "auto",
  },
}));

interface CaseRuleOverrideHistoryProps {
  ruleId: string;
  canOverride: boolean;
}

export default function CaseRuleOverrideHistory({
  ruleId,
  canOverride,
}: CaseRuleOverrideHistoryProps): JSX.Element {
  const classes = useStyles();

  const overrides = GetCaseRulesOverridesSelector(ruleId);
  let lastUpdateId = "";

  const overrideUpdateSelector = GetCaseOverrideUpdateSelector();

  if (
    overrideUpdateSelector &&
    overrideUpdateSelector.payload &&
    overrideUpdateSelector.payload.id
  ) {
    lastUpdateId = overrideUpdateSelector.payload.id;
  }

  return (
    <>
      {!canOverride && (
        <Box pt={2} pb={2}>
          <Alert severity="warning" aria-label="Info Message">
            Overrides have been disabled for this rule. Existing overrides will
            not be applied.
          </Alert>
        </Box>
      )}
      {overrides && overrides.length > 0 && (
        <Grid container spacing={1} data-testid="caseRuleOverrideHistory">
          <Grid item xs={11}>
            <Typography>Override History</Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  {overrides.map((override) => (
                    <TableRow key={override.id} data-testid="overrideRow">
                      <TableCell>
                        <Grid
                          container
                          spacing={1}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start"
                        >
                          <Grid item>
                            <Badge
                              color="secondary"
                              overlap="circle"
                              variant="dot"
                              invisible={lastUpdateId !== override.id}
                            >
                              <SubjectIcon color="primary" />
                            </Badge>
                          </Grid>
                          <Grid item>
                            <div className={classes.nowrap}>
                              {format(
                                new Date(override.created_at),
                                "dd-MMM-yyyy HH:mm:ss"
                              )}
                            </div>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <div className={classes.nowrap}>
                          {override.applied === true && (
                            <CheckCircleOutlineOutlinedIcon
                              fontSize="small"
                              className={classes.success}
                            />
                          )}
                          {override.applied === false && (
                            <HighlightOffOutlinedIcon
                              fontSize="small"
                              className={classes.error}
                            />
                          )}
                          {override.applied === true ? "Applied" : "Removed"}
                        </div>
                      </TableCell>
                      <TableCell>Unknown User</TableCell>
                      <TableCell>{override.override_reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
}
