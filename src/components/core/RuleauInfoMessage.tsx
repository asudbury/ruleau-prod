import React from "react";
import { Typography, Grid } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { logDebug } from "../../utils/Logger";

interface RuleauInfoMessageProps {
  message: string;
}

export default function RuleauInfoMessage({
  message,
}: RuleauInfoMessageProps): JSX.Element {
  logDebug("RuleauInfoMessage", "Start");

  return (
    <Grid container spacing={1} direction="row" data-testid="infoMessage">
      <Grid item>
        <InfoOutlinedIcon color="secondary" fontSize="small" />
      </Grid>
      <Grid item>
        <Typography variant="body2">{message}</Typography>
      </Grid>
    </Grid>
  );
}
