import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import RuleauButton from "./core/RuleauButton";
import {
  logError,
  logWarning,
  logInfo,
  logDebug,
  logTrace,
} from "../utils/Logger";

export default function TestComponent(): JSX.Element {
  const theme = useTheme();

  function handleLogSampleCalls() {
    logError("TestComponent", "Sample Error please ignore!");
    logWarning("TestComponent", "Sample Warning please ignore!");
    logInfo("TestComponent", "Sample Info please ignore!");
    logDebug("TestComponent", "Sample Debug please ignore!");
    logTrace("TestComponent", "Sample Trace please ignore!");
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
            <RuleauButton
              datatestid="sampleCallsButton"
              arialabel="Sample Calls"
              onClick={handleLogSampleCalls}
              content="Log Sample Calls"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1">h1. Heading</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">h2. Heading</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3">h3. Heading</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">h4. Heading</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">h5. Heading</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">h6. Heading</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              subTitle 1 Lorem ipsum dolor sit amet, consectetur adipisicing
              elit
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              subTitle 2 Lorem ipsum dolor sit amet, consectetur adipisicing
              elit
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              body 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              body 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="div">
              <Box fontWeight="fontWeightLight" m={1}>
                Light
              </Box>
              <Box fontWeight="fontWeightRegular" m={1}>
                Regular
              </Box>
              <Box fontWeight="fontWeightMedium" m={1}>
                Medium
              </Box>
              <Box fontWeight={500} m={1}>
                500
              </Box>
              <Box fontWeight="fontWeightBold" m={1}>
                Bold
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <pre>{JSON.stringify(theme, null, 2)}</pre>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
