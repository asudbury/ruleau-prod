import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FormControl, Grid, Typography, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useCaseRuleOverride from "../../hooks/UseCaseRuleOverride";
import GetCaseHasErrorsSelector from "../../services/selectors/GetCaseHasErrorsSelector";
import GetCaseOverrideUpdateSelector from "../../services/selectors/GetCaseOverrideUpdateSelector";
import RuleauButton from "../core/RuleauButton";
import RuleauProgressButton from "../core/RuleauProgressButton";

interface CaseRuleOverrideProps {
  ruleId: string;
  onUpdateOverride: (
    ruleName: string,
    reason: string,
    applied: boolean
  ) => void;
  onOverrideUpdated: () => void;
}

export default function CaseRuleOverride({
  ruleId,
  onUpdateOverride,
  onOverrideUpdated,
}: CaseRuleOverrideProps): JSX.Element {
  const history = useHistory();
  const caseRuleOverride = useCaseRuleOverride(ruleId);

  const [overrideReason, setOverrideReason] = useState("");
  const [invalidOverrideText, setInvalidOverrideText] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [overrideSaved, setOverrideSaved] = useState(false);
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const overrideupdateSelector = GetCaseOverrideUpdateSelector();
  const hasCaseErrors = GetCaseHasErrorsSelector();

  function handleUpdateOverride() {
    setShowErrorMessage(false);

    if (!overrideReason) {
      setInvalidOverrideText(true);
      setLoading(false);
    } else {
      setLoading(true);
      setTimeout(() => {
        setInvalidOverrideText(false);
        setUpdateInProgress(true);
        onUpdateOverride(
          ruleId,
          overrideReason,
          caseRuleOverride.state.applied
        );
      }, 500);
    }
  }

  function handleOverrideReasonChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOverrideReason(e.target.value);
  }

  function handleReturnToCaseList() {
    history.goBack();
  }

  useEffect(() => {
    if (overrideupdateSelector.error === true) {
      setShowErrorMessage(true);
      setLoading(false);
    } else if (updateInProgress === true && overrideupdateSelector.payload.id) {
      setOverrideSaved(true);
      setUpdateInProgress(false);
      onOverrideUpdated();
    }
  }, [overrideupdateSelector]);

  return (
    <Grid container spacing={1} data-testid="caseRuleOverride">
      <Grid item xs={11}>
        <Typography gutterBottom>Override</Typography>
      </Grid>
      <Grid item xs={12}>
        {!overrideSaved && !hasCaseErrors && (
          <FormControl style={{ width: `50%` }}>
            <TextField
              data-testid="overrideText"
              label={caseRuleOverride.state.label}
              value={overrideReason}
              multiline
              rows={6}
              inputProps={{
                maxLength: 2000,
                "aria-label": "Override Reason Text",
              }}
              variant="filled"
              error={invalidOverrideText}
              helperText={
                caseRuleOverride.state.invalidOverrideText === true
                  ? caseRuleOverride.state.reasonText
                  : ""
              }
              onChange={handleOverrideReasonChange}
            />
          </FormControl>
        )}
      </Grid>
      {hasCaseErrors && (
        <Grid item xs={6}>
          <Alert severity="error" aria-label="Load Error Message">
            {caseRuleOverride.state.loadErrorMessage}
          </Alert>
        </Grid>
      )}
      {showErrorMessage && (
        <Grid item xs={6}>
          <Alert severity="error" aria-label="Save Error Message">
            {caseRuleOverride.state.saveErrorMessage}
          </Alert>
        </Grid>
      )}
      <Grid item xs={11}>
        {!overrideSaved && !hasCaseErrors && (
          <RuleauProgressButton
            datatestid="overrideButton"
            arialabel="Override Button"
            onClick={handleUpdateOverride}
            loading={loading}
            content={caseRuleOverride.state.buttonLabel}
          />
        )}
      </Grid>
      {overrideSaved && (
        <Grid item xs={6}>
          <Alert severity="success" aria-label="Info Message">
            {caseRuleOverride.state.saveMessage}
          </Alert>
        </Grid>
      )}
      {overrideSaved ||
        (hasCaseErrors && (
          <Grid item xs={12}>
            <RuleauButton
              datatestid="returnToCaseListButton"
              arialabel="Return to Case List"
              onClick={handleReturnToCaseList}
              content="Return to Case List"
            />
          </Grid>
        ))}
    </Grid>
  );
}
