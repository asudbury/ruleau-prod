import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Alert } from "@material-ui/lab";
import RuleAccordion from "../rule/RuleAccordion";
import CaseRulePayload from "./CaseRulePayload";
import CaseRuleOverride from "./CaseRuleOverride";
import CaseRuleOverrideHistory from "./CaseRuleOverrideHistory";
import { logDebug } from "../../utils/Logger";
import CaseRuleDependencies from "./CaseRuleDependencies";
import RuleauInfoMessage from "../core/RuleauInfoMessage";
import { CASE_STATUS_CLOSED, RULE_STATUS_SKIPPED } from "../utils/Constants";

interface CaseRulesProps {
  caseStatus: string;
  rules: any;
  warningSelected: string;
  onUpdateOverride: (
    ruleName: string,
    reason: string,
    applied: boolean
  ) => void;
  onOverrideUpdated: () => void;
}

export default function CaseRules({
  caseStatus,
  rules,
  warningSelected,
  onUpdateOverride,
  onOverrideUpdated,
}: CaseRulesProps): JSX.Element {
  logDebug(
    "CaseRules",
    `Start warningSelected=${warningSelected} ruleCount=${rules.length}`
  );

  const canOverride = 2;

  const [expanded, setExpanded] = useState(false);

  const [showSkipped, setShowSkipped] = useState(false);
  const [displayRules, setDisplayRules] = useState(
    rules.filter((item) => item.result.status !== RULE_STATUS_SKIPPED)
  );

  const handleChange = (panel) => (event, isExpanded) => {
    logDebug(
      "CaseRules",
      `handleChange warningSelected=${warningSelected} isExpanded=${isExpanded}`
    );

    setExpanded(isExpanded ? panel : false);
  };

  function canOverrideRule(rule): boolean {
    return rule.rule_version.override_level === canOverride;
  }

  function handleShowSkipped() {
    setShowSkipped(!showSkipped);

    if (showSkipped) {
      setDisplayRules(
        rules.filter((item) => item.result.status !== RULE_STATUS_SKIPPED)
      );
    } else {
      setDisplayRules(rules);
    }
  }

  function hasSkippedRules(): boolean {
    let skippedRules = [];

    if (rules) {
      skippedRules = rules.filter(
        (item) => item.result.status === RULE_STATUS_SKIPPED
      );
    }

    return skippedRules.length > 0;
  }

  return (
    <div data-testid="caseRules">
      {hasSkippedRules() && (
        <Box m={2}>
          <FormControlLabel
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Switch
                checked={showSkipped}
                onChange={handleShowSkipped}
                data-testid="showSkippedRules"
                aria-label="Show Skipped Rules"
              />
            }
            label={
              <Typography variant="caption">Show Skipped Rules</Typography>
            }
          />
        </Box>
      )}
      {displayRules.map((rule) => (
        <Accordion
          key={rule.id}
          data-testid={`caseRule${rule.id}`}
          expanded={expanded === rule.rule_version.name}
          onChange={handleChange(rule.rule_version.name)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${rule.rule_version.name}-header`}
            id={`${rule.rule_version.name}-id`}
          >
            <RuleAccordion
              isRuleDefinition={false}
              hasWarning={!rule.result.result}
              ruleName={rule.id}
              ruleDescription={rule.rule_version.name}
              ruleSubDescription={rule.rule_version.description}
              canBeOverriden={rule.rule_version.override_level === 2}
              status={rule.result.status}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={1} />
              <Grid item xs={11}>
                {rule.result.status !== RULE_STATUS_SKIPPED &&
                  rule.result.payloads.length === 0 && (
                    <RuleauInfoMessage message="This rule has no payload" />
                  )}
                {rule.result.status !== RULE_STATUS_SKIPPED &&
                  rule.result.payloads.length > 0 && (
                    <CaseRulePayload rulePayload={rule.result.payloads} />
                  )}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={11}>
                {rule.rule_version.dependencies.length === 0 && (
                  <RuleauInfoMessage message="This rule has no dependencies" />
                )}
                {rule.rule_version.dependencies.length > 0 && (
                  <CaseRuleDependencies
                    dependencies={rule.rule_version.dependencies}
                  />
                )}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={11}>
                {rule.result.skipped_reason && (
                  <RuleauInfoMessage
                    message={rule.result.skipped_reason.message}
                  />
                )}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={11}>
                <CaseRuleOverrideHistory
                  ruleId={rule.id}
                  canOverride={canOverrideRule(rule)}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={11}>
                {caseStatus !== "CLOSED" &&
                  rule.result.status !== RULE_STATUS_SKIPPED &&
                  !rule.result.result &&
                  canOverrideRule(rule) && (
                    <CaseRuleOverride
                      ruleId={rule.id}
                      onUpdateOverride={onUpdateOverride}
                      onOverrideUpdated={onOverrideUpdated}
                    />
                  )}
                {caseStatus === CASE_STATUS_CLOSED && (
                  <RuleauInfoMessage message="Overrides may not be applied to closed cases. Re-open the case to make changes" />
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      {rules.length === 0 && (
        <Alert severity="info" aria-label="No Rules" data-testid="noRules">
          This case has no rules.
        </Alert>
      )}
    </div>
  );
}
