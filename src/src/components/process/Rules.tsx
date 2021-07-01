import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetProcessSelector from "../../services/selectors/GetProcessSelector";
import GetProcessRulesSelector from "../../services/selectors/GetProcessRulesSelector";
import RuleAccordion from "../rule/RuleAccordion";
import RuleDetails from "../rule/RuleDetails";
import RuleDocumentation from "../rule/RuleDocumentation";
import { logDebug, logError } from "../../utils/Logger";
import { fetchProcessRules } from "../../services/slices/ProcessRulesThunks";

export default function Rules(): JSX.Element {
  logDebug("Rules", "Start");

  const dispatch = useDispatch();

  const { processName } = useParams();

  const process = GetProcessSelector(processName);

  const rulesData = GetProcessRulesSelector();

  useEffect(() => {
    if (process) {
      logDebug("Rules", `Fetching Rules processId=${process.id}`);
      dispatch(fetchProcessRules(process.id));
    } else {
      logError("Rules", "Process is null!");
    }
  }, []);

  return (
    <div data-testid="rules">
      {rulesData.payload.map((rule) => (
        <Accordion key={rule.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <RuleAccordion
              isRuleDefinition
              hasWarning={false}
              ruleName={rule.id}
              ruleDescription={rule.current_version.name}
              ruleSubDescription={rule.current_version.description}
              canBeOverriden={false}
              status=""
            />
          </AccordionSummary>
          <AccordionDetails>
            <Box pl={10} mb={5}>
              <div style={{ marginBottom: "20px" }}>
                <RuleDetails rule={rule} />
              </div>
              <RuleDocumentation rule={rule} />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
