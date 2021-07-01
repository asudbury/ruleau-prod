import React from "react";
import Button from "@material-ui/core/Button";

interface RuleauButtonProps {
  datatestid: string;
  arialabel: string;
  content: string;
  onClick: () => void;
}

export default function RuleauButton({
  datatestid,
  arialabel,
  content,
  onClick,
}: RuleauButtonProps): JSX.Element {
  return (
    <Button
      data-testid={datatestid}
      aria-label={arialabel}
      variant="outlined"
      color="primary"
      onClick={onClick}
    >
      {content}
    </Button>
  );
}
