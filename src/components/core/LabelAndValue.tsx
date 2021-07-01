/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";

interface LabelAndValueProps {
  variant: Variant;
  label: string;
  value: string;
}

export default function LabelAndValue({
  variant,
  label,
  value,
}: LabelAndValueProps): JSX.Element {
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      data-testid="labelAndValue"
    >
      <Grid item>
        <Typography variant={variant}>{label} :</Typography>
      </Grid>
      <Grid item>
        <Typography variant={variant}>{value}</Typography>
      </Grid>
    </Grid>
  );
}
