import React from "react";
import { render } from "@testing-library/react";
import RuleExamples from "./RuleExamples";
import { TestRules } from "../../testData/TestRules";

test("Test Rule Examples", () => {
  const { doctests } = TestRules[0].current_version;

  const { getByTestId } = render(<RuleExamples ruleExamples={doctests} />);

  const ruleExamples = getByTestId("ruleExamples");

  expect(ruleExamples).toBeInTheDocument();
});
