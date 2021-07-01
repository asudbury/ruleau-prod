import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import LayersIcon from "@material-ui/icons/Layers";
import RuleauSyntaxHighlighter from "../core/RuleauSyntaxHighlighter";
import { logDebug, logWarning } from "../../utils/Logger";

const useStyles = makeStyles(() => ({
  ExpandedIcon: {
    "& div.MuiAccordionSummary-expandIcon": {
      position: "absolute",
      right: "99%",
    },
  },
}));

interface RuleExamplesProps {
  ruleExamples: any;
}

export default function RuleExamples({
  ruleExamples,
}: RuleExamplesProps): JSX.Element {
  logDebug("RuleExamples", "Start");

  const classes = useStyles();

  function getJson(json: string): any {
    const formattedJson = json.replace(/\\/g, "");
    const jsonString = JSON.parse(formattedJson);
    return JSON.stringify(jsonString, null, 2);
  }

  function getFormattedPayload(payload: string): string {
    try {
      return getJson(payload);
    } catch (e) {
      logWarning("RulesExamples", `Failed to parse Payload Json error=${e}`);
    }
    return "Could not load Payload";
  }

  function getFormattedContext(context: string): string {
    if (context) {
      try {
        return getJson(context);
      } catch (e) {
        logWarning("RulesExamples", `Failed to parse Context Json error=${e}`);
      }
    }
    return "None";
  }

  return (
    <Accordion data-testid="ruleExamples">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panelExamples-content"
        id="panelExamples-header"
        className={classes.ExpandedIcon}
      >
        <Grid container spacing={1} direction="row">
          <Grid item>
            <VerticalSplitIcon color="secondary" fontSize="small" />
          </Grid>
          <Grid item>
            <Typography variant="body2">Examples</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Payload</TableCell>
                <TableCell>Context</TableCell>
                <TableCell>Expected Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ruleExamples.map((example) => (
                <TableRow key={example.test}>
                  <TableCell style={{ verticalAlign: "top" }}>
                    <pre style={{ width: "0px" }}>
                      <LayersIcon color="primary" />
                    </pre>
                  </TableCell>
                  <TableCell style={{ verticalAlign: "top" }}>
                    <RuleauSyntaxHighlighter
                      language="json"
                      text={getFormattedPayload(example.payload)}
                    />
                  </TableCell>
                  <TableCell style={{ verticalAlign: "top" }}>
                    {example.context && (
                      <RuleauSyntaxHighlighter
                        language="json"
                        text={getFormattedContext(example.context)}
                      />
                    )}
                    {!example.context && <pre>None</pre>}
                  </TableCell>
                  <TableCell style={{ verticalAlign: "top" }}>
                    <pre>{example.result}</pre>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
