import React from "react";
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import AssessmentIcon from "@material-ui/icons/Assessment";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { logDebug } from "../../utils/Logger";

interface RuleParametersProps {
  ruleParameters: any;
}

export default function RuleParameters({
  ruleParameters,
}: RuleParametersProps): JSX.Element {
  logDebug("RuleParameters", "Start");

  return (
    <>
      <Grid container spacing={1} direction="row" data-testid="ruleParameters">
        <Grid item>
          <FormatListNumberedIcon color="secondary" fontSize="small" />
        </Grid>
        <Grid item>
          <Typography variant="body2">Parameters</Typography>
        </Grid>
      </Grid>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ruleParameters.map((parameter) => (
              <TableRow
                key={parameter.name}
                data-testid={`ruleParameterItem-${parameter.name}`}
              >
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <AssessmentIcon color="primary" />
                    {parameter.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{parameter.value}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
