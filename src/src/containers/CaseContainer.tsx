import React, { useState, useEffect } from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import GetCaseSelectorById from "../services/selectors/GetCaseSelectorById";
import CaseDetails from "../components/case/CaseDetails";
import CaseRules from "../components/case/CaseRules";
import { fetchCaseOverrides } from "../services/slices/CaseOverrides";
import { postCaseOverride } from "../services/slices/CaseOverridePost";
import { caseClose } from "../services/slices/CaseClose";
import Error from "../components/Error";
import { logDebug, logError } from "../utils/Logger";
import GetProcessSelector from "../services/selectors/GetProcessSelector";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));

export default function CaseContainer(): JSX.Element {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { processName, id } = useParams<{ processName: string; id: string }>();

  const [warningSelected, setWarningSelected] = useState("");

  const process = GetProcessSelector(processName);
  const caseDetails = GetCaseSelectorById(id);

  let rules = [] as any;

  if (caseDetails) {
    if (caseDetails.rules) {
      rules = caseDetails.rules;
    }
  } else {
    logError("CaseContainer", `Invalid Case ID ${id}`);
  }

  function handleRuleWarningSelected(rule: string) {
    setWarningSelected(rule);
  }

  function getCasesOverrides() {
    if (id && process) {
      const processId = process.id;
      dispatch(fetchCaseOverrides({ processId, id }));
    } else {
      logError("CaseContainer", "Error fetching overrides");
    }
  }

  function handleUpdateOverride(
    ruleId: string,
    reason: string,
    applied: boolean
  ) {
    const payload = {
      rule: ruleId,
      override_reason: reason,
      applied,
    };

    logDebug("CaseContainer", "handleUpdateOverride");

    if (id && process) {
      const processId = process.id;
      dispatch(postCaseOverride({ processId, id, payload }));
    } else {
      logError("CaseContainer", "Error posting override");
    }
  }

  function handleCaseClose() {
    let newStatus = "CLOSED";

    if (caseDetails && caseDetails.status === "CLOSED") {
      newStatus = "OPEN";
    }
    const payload = {
      status: newStatus,
    };

    logDebug("CaseContainer", `handleCaseClose status=${newStatus}`);
    logDebug("CaseContainer", `handleCaseClose id=${id}`);

    if (id && process) {
      const processId = process.id;
      dispatch(caseClose({ processId, id, payload }));
    } else {
      logError("CaseContainer", "Error closing case");
    }
  }

  useEffect(() => {
    getCasesOverrides();
  }, []);

  return (
    <div className={classes.root}>
      {caseDetails && (
        <Box ml={5} mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CaseDetails
                caseDetails={caseDetails}
                onWarningSelected={handleRuleWarningSelected}
                onCaseClose={handleCaseClose}
              />
            </Grid>
            <Grid item xs={12}>
              <CaseRules
                caseStatus={caseDetails.status}
                rules={rules}
                warningSelected={warningSelected}
                onUpdateOverride={handleUpdateOverride}
                onOverrideUpdated={getCasesOverrides}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {!caseDetails && (
        <Grid container justify="center">
          <Error />
        </Grid>
      )}
    </div>
  );
}
