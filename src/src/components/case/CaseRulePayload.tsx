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
  Paper,
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
  Padded: {
    padding: "0.5em",
  },
}));

interface CaseRulePayloadProps {
  rulePayload: any;
}

export default function CaseRulePayload({
  rulePayload,
}: CaseRulePayloadProps): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <Accordion
        data-testid="caseRulePayload"
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
              <Typography variant="body2">Rule Payload</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer
            data-testid="caseRulePayload"
            component={Paper}
            style={{ width: "max-content" }}
          >
            <Table size="small" aria-label="rule payload">
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell align="center">Accessed Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rulePayload.map((item) => (
                  <TableRow key={item.key}>
                    <TableCell style={{ verticalAlign: "top" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <GrainIcon color="primary" />
                        <pre className={classes.Padded}>{item.key}</pre>
                      </div>
                    </TableCell>
                    <TableCell style={{ verticalAlign: "top" }}>
                      <RuleauSyntaxHighlighter
                        language="json"
                        text={JSON.stringify(item.value, null, 2)}
                      />
                    </TableCell>
                    <TableCell style={{ verticalAlign: "top" }}>
                      <pre className={classes.Padded}>
                        {item.accessed_count}
                      </pre>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
