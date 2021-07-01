import React from "react";
import { render } from "@testing-library/react";
import RuleDocumentation from "./RuleDocumentation";
import { TestRules } from "../../testData/TestRules";

test("Test Rule Documentation", () => {
  const rule = TestRules[0];

  const { getByTestId } = render(<RuleDocumentation rule={rule} />);

  const ruleDocumentation = getByTestId("ruleDocumentation");

  expect(ruleDocumentation).toBeInTheDocument();

  const ruleParameters = getByTestId("ruleParameters");

  expect(ruleParameters).toBeInTheDocument();

  const ruleParameterItem = getByTestId("ruleParameterItem-Owner");

  expect(ruleParameterItem.textContent).toContain("Penny Farthing");

  expect(ruleParameterItem).toBeInTheDocument();
});
