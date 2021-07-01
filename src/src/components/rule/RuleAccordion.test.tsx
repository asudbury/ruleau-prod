import React from "react";
import { render } from "@testing-library/react";
import RuleAccordion from "./RuleAccordion";

test("Render the Rule Accordion", () => {
  const { getByTestId } = render(
    <RuleAccordion
      isRuleDefinition
      hasWarning={false}
      ruleName="ruleName"
      ruleDescription="ruleDescription"
      ruleSubDescription="ruleSubDescription"
      canBeOverriden={false}
      status="FINISHED"
    />
  );

  const ruleAccordion = getByTestId("ruleAccordion");

  expect(ruleAccordion).toBeInTheDocument();
});
