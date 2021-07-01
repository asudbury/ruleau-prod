import React from "react";
import { Router } from "react-router-dom";
import ReactRouter from "react-router";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import useUrlManager from "./UseUrlManager";

test("Test UseUrlManager", () => {
  function TestComponent(): JSX.Element {
    jest.spyOn(ReactRouter, "useParams").mockReturnValue({
      processName: "Adrian-Test-Proc ",
      id: "Adrian1234445",
    });

    const history = createMemoryHistory();

    const [publicUrl, processName, formattedProcessName, id] = useUrlManager();

    return (
      <Router history={history}>
        <div>{publicUrl}</div>
        <div>{processName}</div>
        <div>{formattedProcessName}</div>
        <div>{id}</div>
      </Router>
    );
  }

  const { container } = render(<TestComponent />);

  expect(container).toHaveTextContent("Adrian-Test-Proc");
  expect(container).toHaveTextContent("Adrian Test Proc");
  expect(container).toHaveTextContent("Adrian1234445");
});
