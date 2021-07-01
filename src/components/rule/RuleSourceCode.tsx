import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { logDebug } from "../../utils/Logger";
import RuleauSyntaxHighlighter from "../core/RuleauSyntaxHighlighter";

const useStyles = makeStyles(() => ({
  ExpandedIcon: {
    "& div.MuiAccordionSummary-expandIcon": {
      position: "absolute",
      right: "99%",
    },
  },
}));

interface RuleSourceProps {
  sourceCode: string;
}

export default function RuleSource({
  sourceCode,
}: RuleSourceProps): JSX.Element {
  logDebug("RuleSourceCode", "Start");

  const classes = useStyles();

  return (
    <Accordion data-testid="ruleSourceCode">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panelSourceCode-content"
        id="panelSourceCode-header"
        className={classes.ExpandedIcon}
      >
        <Grid container spacing={1} direction="row">
          <Grid item>
            <BorderColorIcon color="secondary" fontSize="small" />
          </Grid>
          <Grid item>
            <Typography variant="body2">Source Code</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <RuleauSyntaxHighlighter language="python" text={sourceCode} />
      </AccordionDetails>
    </Accordion>
  );
}
