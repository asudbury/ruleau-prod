import React from "react";
import { render } from "@testing-library/react";
import RuleDetails from "./RuleDetails";
import { TestRules } from "../../testData/TestRules";

test("Test Rule Details", () => {
  const rule = TestRules[0];

  const { getByTestId } = render(<RuleDetails rule={rule} />);

  const ruleDetails = getByTestId("ruleDetails");

  expect(ruleDetails).toBeInTheDocument();

  const overrideLevel = getByTestId("overrideLevel");

  expect(overrideLevel).toBeInTheDocument();

  expect(overrideLevel.textContent).toContain("Override Allowed");

  const ruleDependencies = getByTestId("ruleDependencies");

  expect(ruleDependencies).toBeInTheDocument();

  expect(ruleDependencies.textContent).toContain("Rule Dependencies :rul-mid");
});
