/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import MaterialTable from "material-table";
import {
  makeStyles,
  Box,
  Grid,
  Link,
  TablePagination,
} from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import TableIcons from "./table/TableIcons";
import { getLog, initLog } from "../utils/Logger";

const useStyles = makeStyles(() => ({
  nowrap: {
    display: "flex",
    whiteSpace: "nowrap",
    overflow: "auto",
  },
}));

export default function LogViewer(): JSX.Element {
  const classes = useStyles();
  const alignment = "left";
  const logData = getLog();

  const reduxStore = (window as any).store;

  function getData() {
    const data = JSON.stringify(logData, null, 4);
    const reduxData = JSON.stringify(reduxStore.getState(), null, 4);

    return `logData\n\n${data}\n\n\nreduxData\n\n\n${reduxData}`;
  }

  function onCopyToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(getData());
    }
  }

  function onClearLog() {
    initLog();
  }

  return (
    <div>
      <Box pl={4}>
        <Grid container spacing={3}>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              data-testid="copyToClipboard"
              aria-label="Copy to Clipboard link"
              onClick={onCopyToClipboard}
            >
              Copy to Clipboard
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              data-testid="clearLog"
              aria-label="Clear Log link"
              onClick={onClearLog}
            >
              Clear Log
            </Link>
          </Grid>
        </Grid>
        <MaterialTable
          title=""
          icons={TableIcons}
          components={{
            Pagination: (props) => (
              <TablePagination
                {...props}
                rowsPerPageOptions={[10, 20, 50, 100, 500, 1000]}
                style={{ width: "10" }}
              />
            ),
          }}
          columns={[
            {
              title: "Time",
              field: "time",
              cellStyle: {
                whiteSpace: "nowrap",
              },
              render: (rowData) => (
                <div className={classes.nowrap}>
                  <EventNoteIcon fontSize="small" color="primary" />
                  {rowData.time}
                </div>
              ),
            },
            {
              title: "Type",
              field: "type",
              cellStyle: {
                whiteSpace: "nowrap",
              },
              lookup: {
                Error: "Error",
                Warning: "Warning",
                Info: "Info",
                Debug: "Debug",
                Trace: "Trace",
              },
            },
            {
              title: "Location",
              field: "location",
              cellStyle: {
                whiteSpace: "nowrap",
              },
            },
            {
              title: "Message",
              field: "message",
              cellStyle: {
                whiteSpace: "nowrap",
              },
            },
          ]}
          data={logData}
          options={{
            headerStyle: {
              whiteSpace: "nowrap",
            },
            search: true,
            filtering: true,
            padding: "dense",
            exportButton: true,
            pageSize: 10,
            searchFieldAlignment: alignment,
            toolbarButtonAlignment: alignment,
          }}
        />
        <Box fontFamily="Monospace" fontSize="p.fontSize" border={1} p={5}>
          <pre>{JSON.stringify(reduxStore.getState(), null, 4)}</pre>
        </Box>
      </Box>
    </div>
  );
}
