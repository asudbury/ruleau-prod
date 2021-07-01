import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  makeStyles,
} from "@material-ui/core";
import GrainIcon from "@material-ui/icons/Grain";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RuleauSyntaxHighlighter from "../core/RuleauSyntaxHighlighter";

const useStyles = makeStyles(() => ({
  ExpandedIcon: {
    "& div.MuiAccordionSummary-expandIcon": {
      position: "absolute",
      right: "99%",
    },
  },
}));

interface CasePayloadProps {
  payload: string;
}

export default function CasePayload({
  payload,
}: CasePayloadProps): JSX.Element {
  const classes = useStyles();

  function getJson(json: string): any {
    const formattedJson = json.replace(/\\/g, "");
    const jsonString = JSON.parse(formattedJson);
    return JSON.stringify(jsonString, null, 2);
  }

  return (
    <>
      <Accordion
        data-testid="casePayload"
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelRulePayload-content"
          id="panelRulePayload-header"
          className={classes.ExpandedIcon}
        >
          <Grid container spacing={1} direction="row">
            <Grid item>
              <GrainIcon color="secondary" fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body2">Case Payload</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <RuleauSyntaxHighlighter language="json" text={getJson(payload)} />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
