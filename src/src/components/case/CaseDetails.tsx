import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { format } from "date-fns";
import LabelAndValue from "../core/LabelAndValue";
import CaseWarnings from "./CaseWarnings";
import RuleauProgressButton from "../core/RuleauProgressButton";
import GetCaseCloseSelector from "../../services/selectors/GetCaseCloseSelector";
import { logDebug, logError } from "../../utils/Logger";
import CasePayload from "./CasePayload";

interface CaseDetailsProps {
  caseDetails: any;
  onWarningSelected: (ruleName: string) => void;
  onCaseClose: () => void;
}

export default function CaseDetails({
  caseDetails,
  onWarningSelected,
  onCaseClose,
}: CaseDetailsProps): JSX.Element {
  const formattedDate = format(
    new Date(caseDetails.created_at),
    "dd-MMM-yyyy HH:mm:ss"
  );

  const history = useHistory();

  const payload = JSON.stringify(caseDetails.payload, null, 2);

  let ruleWarnings = [];

  if (caseDetails.rules) {
    ruleWarnings = caseDetails.rules.filter(
      (item) =>
        item.result.result === false &&
        item.order !== 0 &&
        item.rule_version.override_level === 2
    );
  }

  const hasWarnings = ruleWarnings.length > 0;

  let closeCaseLabel = "Close Case";

  if (caseDetails.status === "CLOSED") {
    closeCaseLabel = "Reopen Case";
  }

  const [loading, setLoading] = React.useState(false);
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const caseCloseSelector = GetCaseCloseSelector();

  function handleRuleWarningSelected(rule: string) {
    onWarningSelected(rule);
  }

  function handleCaseClose() {
    logDebug("CaseDetails", "handleCaseClose");
    setLoading(true);
    setUpdateInProgress(true);

    setTimeout(() => {
      onCaseClose();
    }, 300);
  }

  useEffect(() => {
    if (caseCloseSelector.error === true && updateInProgress) {
      setShowErrorMessage(true);
      setLoading(false);
      logError("CaseDetails", "Could not close/reopen the case");
    } else if (updateInProgress === true && caseCloseSelector.payload.id) {
      logDebug("CaseDetails", "Case closed/reopened Completed.");
      history.goBack();
    }
  }, [caseCloseSelector]);

  return (
    <Grid container spacing={2} data-testid="caseDetails">
      <Grid item xs={12} sm={6}>
        <LabelAndValue variant="h6" label="Case ID" value={caseDetails.id} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RuleauProgressButton
          datatestid="closeCaseButton"
          arialabel="Close Button"
          onClick={handleCaseClose}
          loading={loading}
          content={closeCaseLabel}
        />
        {showErrorMessage && (
          <Grid item xs={6}>
            <Alert severity="error" aria-label="Save Error Message">
              An Error has occured updating the Case
            </Alert>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <LabelAndValue
          variant="body1"
          label="Processed On"
          value={formattedDate}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box ml={3}>
          <CasePayload payload={payload} />
        </Box>
      </Grid>

      <Grid item xs={6} />
      <Grid item xs={12} md={6}>
        {hasWarnings && (
          <CaseWarnings
            warningRules={ruleWarnings}
            onWarningSelected={handleRuleWarningSelected}
            data-testid="caseWarnings"
          />
        )}
      </Grid>
    </Grid>
  );
}
