import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import ProcessCard from "./process/ProcessCard";
import { fetchProcesses } from "../services/slices/Processes";
import GetProcessesSelector from "../services/selectors/GetProcessesSelector";
import { logDebug, logError } from "../utils/Logger";

export default function Dashboard(): JSX.Element {
  logDebug("Dashboard", "Start");
  const dispatch = useDispatch();

  const processes = GetProcessesSelector();

  useEffect(() => {
    logDebug("Dashboard", "Fetching Processes");
    dispatch(fetchProcesses());
  }, []);

  useEffect(() => {
    if (processes.error) {
      logError("Dashboard", "Could not load Processes");
    }
  }, [processes.error]);

  return (
    <>
      {processes.error && (
        <Alert severity="error" aria-label="Load Error Message">
          There has been an error loading the Dashboard
        </Alert>
      )}
      {!processes.error && (
        <Box p={5} data-testid="dashboard">
          <Grid container spacing={5} direction="column">
            <Grid item>
              <Box fontWeight="fontWeightBold">
                <Typography variant="h4" gutterBottom>
                  Welcome to your Ruleau Dashboard
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box fontWeight="fontWeightMedium">
                <Typography variant="h5">My Processes</Typography>
              </Box>
            </Grid>

            {processes.payload.map((process) => (
              <Grid item xs={12} md={6} key={process.id}>
                <ProcessCard
                  processId={process.id}
                  title={process.name}
                  description={process.description}
                />
              </Grid>
            ))}

            {processes.payload.length === 0 && (
              <Alert severity="info" aria-label="No Processes Message">
                No Processes have been setup.
              </Alert>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}
