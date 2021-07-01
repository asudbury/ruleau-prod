/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import { Alert } from "@material-ui/lab";
import { makeStyles, TablePagination } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";
import WorkIcon from "@material-ui/icons/Work";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { format } from "date-fns";
import TableIcons from "../table/TableIcons";
import { fetchCases } from "../../services/slices/Cases";
import GetProcessSelector from "../../services/selectors/GetProcessSelector";
import GetCasesSelector from "../../services/selectors/GetCasesSelector";

import { logDebug, logError } from "../../utils/Logger";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.down("sm")]: {
        width: 600,
      },
    },
    error: {
      color: theme.palette.error.main,
    },
    success: {
      color: theme.palette.success.main,
    },
    nowrap: {
      display: "flex",
      whiteSpace: "nowrap",
      overflow: "auto",
    },
  });

const useStyles = makeStyles(styles);

interface CasesProps {
  onCaseSelected: (id: string) => void;
}

export default function Cases({ onCaseSelected }: CasesProps): JSX.Element {
  const dispatch = useDispatch();

  const { processName } = useParams();

  const process = GetProcessSelector(processName);
  const casesData = GetCasesSelector();

  const alignment = "left";

  useEffect(() => {
    if (process) {
      logDebug("Cases", `Fetching Cases processId=${process.id}`);
      dispatch(fetchCases(process.id));
    } else {
      logError("Cases", "Process is null!");
    }
  }, []);

  useEffect(() => {
    if (casesData.error) {
      logError("Cases", "Could not load Cases");
    }
  }, [casesData.error]);

  const classes = useStyles();

  let data = [] as any;

  function handleSelectedRow(
    selectedRow:
      | {
          createdAt: any;
          id: any;
          result: any;
        }
      | undefined
  ) {
    logDebug("Cases", "handleSelectedRow");
    if (selectedRow) {
      onCaseSelected(selectedRow.id);
    }
  }

  if (Array.isArray(casesData.payload)) {
    /// data is not ordered so do an order by id
    const newData = [...casesData.payload];

    newData.sort((a, b) => (a.id > b.id ? 1 : -1));

    data = newData.map((caseItem) => {
      const formattedDate = format(
        new Date(caseItem.created_at),
        "dd-MMM-yyyy HH:mm:ss"
      );

      return {
        id: caseItem.id,
        openClosed: caseItem.status,
        result: caseItem.result,
        createdAt: formattedDate,
      };
    });
  }
  return (
    <>
      {casesData.error && (
        <Alert severity="error" aria-label="Load Cases Error Message">
          There has been an error loading the Cases
        </Alert>
      )}
      {!casesData.error && (
        <div className={classes.container} data-testid="casesTableDiv">
          <MaterialTable
            title=""
            isLoading={casesData.meta.pending}
            icons={TableIcons}
            components={{
              Pagination: (props) => (
                <TablePagination
                  {...props}
                  rowsPerPageOptions={[5, 10, 50, 100, 500, 1000]}
                  style={{ width: "10" }}
                />
              ),
            }}
            columns={[
              {
                title: "Case ID",
                field: "id",
                type: "string",
                cellStyle: {
                  whiteSpace: "nowrap",
                },
                render: (rowData) => (
                  <div style={{ whiteSpace: "nowrap", display: "flex" }}>
                    <WorkIcon fontSize="small" color="primary" />
                    {rowData.id}
                  </div>
                ),
              },
              {
                title: "Open/Closed",
                field: "openClosed",
                type: "string",
                cellStyle: {
                  whiteSpace: "nowrap",
                },
                lookup: { OPEN: "Open", CLOSED: "Closed" },
              },
              {
                title: "Result",
                field: "result",
                type: "string",
                cellStyle: {
                  whiteSpace: "nowrap",
                },
                render: (rowData) => (
                  <>
                    {rowData.result && (
                      <div className={`${classes.nowrap}`}>
                        <CheckCircleOutlineOutlinedIcon
                          fontSize="small"
                          className={classes.success}
                        />
                        Passed
                      </div>
                    )}
                    {!rowData.result && (
                      <div className={`${classes.nowrap}`}>
                        <HighlightOffOutlinedIcon
                          fontSize="small"
                          color="error"
                          className={classes.error}
                        />
                        Failed
                      </div>
                    )}
                  </>
                ),
              },
              {
                title: "Date Processed",
                field: "createdAt",
                cellStyle: {
                  whiteSpace: "nowrap",
                },
              },
            ]}
            data={data}
            onRowClick={(evt, selectedRow) => handleSelectedRow(selectedRow)}
            options={{
              headerStyle: {
                whiteSpace: "nowrap",
              },
              filtering: true,
              padding: "dense",
              searchFieldAlignment: alignment,
              toolbarButtonAlignment: alignment,
              exportButton: true,
              exportFileName: "cases",
              pageSize: 10,
            }}
          />
        </div>
      )}
    </>
  );
}
