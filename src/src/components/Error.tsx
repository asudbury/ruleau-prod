/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Link } from "@material-ui/core";
import History from "../utils/History";
import RuleauButton from "./core/RuleauButton";

export default function Error(): JSX.Element {
  function handleGoHome() {
    History.push("/");
  }

  function onViewLog() {
    History.push("/log");
  }

  return (
    <div>
      <Box p={5}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item xs={12}>
            <Typography variant="h3" color="primary" gutterBottom>
              Sorry
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              It seems like we have an error in the system
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <RuleauButton
              datatestid="goHomeButton"
              arialabel="Go Home button"
              onClick={handleGoHome}
              content="Go Home"
            />
          </Grid>
          <Grid item xs={12}>
            <Link
              href="#"
              variant="body2"
              data-testid="viewLogLink"
              aria-label="View Log link"
              onClick={onViewLog}
            >
              View Log
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
