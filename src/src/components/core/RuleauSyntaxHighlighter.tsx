import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yLight,
  anOldHope,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface RuleauSyntaxHighlighterProps {
  language: string;
  text: string;
}

export default function RuleauSyntaxHighlighter({
  language,
  text,
}: RuleauSyntaxHighlighterProps): JSX.Element {
  const appTheme = localStorage.getItem("appTheme") || "";

  return (
    <>
      <SyntaxHighlighter
        language={language}
        style={appTheme.indexOf("light") > 0 ? a11yLight : anOldHope}
      >
        {text}
      </SyntaxHighlighter>
    </>
  );
}
