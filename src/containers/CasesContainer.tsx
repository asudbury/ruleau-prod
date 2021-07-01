import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Cases from "../components/process/Cases";

export default function CasesContainer(): JSX.Element {
  const history = useHistory();

  const { processName } = useParams();

  function onCaseSelected(id: string) {
    history.push(`/process/${encodeURI(processName)}/case/${encodeURI(id)}`);
  }

  return <Cases onCaseSelected={onCaseSelected} />;
}
