import React from "react";
import RuleauInfoMessage from "../core/RuleauInfoMessage";
import RuleParameters from "./RuleParameters";
import RuleExamples from "./RuleExamples";
import RuleSourceCode from "./RuleSourceCode";
import { logDebug } from "../../utils/Logger";

interface RuleDocumentationProps {
  rule: any;
}

export default function RuleDocumentation({
  rule,
}: RuleDocumentationProps): JSX.Element {
  logDebug("RuleDocumentation", "Start");

  return (
    <div data-testid="ruleDocumentation">
      {rule.current_version.parameters.length === 0 && (
        <RuleauInfoMessage message="This rule has no parameters" />
      )}

      {rule.current_version.parameters.length > 0 && (
        <RuleParameters ruleParameters={rule.current_version.parameters} />
      )}

      {rule.current_version.doctests.length === 0 && (
        <RuleauInfoMessage message="This rule has no examples" />
      )}

      {rule.current_version.doctests.length > 0 && (
        <RuleExamples ruleExamples={rule.current_version.doctests} />
      )}

      <RuleSourceCode sourceCode={rule.current_version.source} />
    </div>
  );
}
