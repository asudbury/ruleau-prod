import React from "react";
import { render } from "@testing-library/react";
import CaseRulePayload from "./CaseRulePayload";

test("Render the Case Rule Payload", () => {
  const details = [
    {
      key: "516c1585-f7f3-498a-8681-08a5f38c3f90",
      value: "hello",
      accessed_count: "5",
    },
  ];

  const { getByTestId } = render(<CaseRulePayload rulePayload={details} />);

  const caseRulePayload = getByTestId("caseRulePayload");

  expect(caseRulePayload).toBeInTheDocument();
});
