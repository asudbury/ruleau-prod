/* eslint-disable camelcase */
/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import { Alert } from "@material-ui/lab";
import { makeStyles, TablePagination } from "@material-ui/core";
import SubjectIcon from "@material-ui/icons/Subject";
import WorkIcon from "@material-ui/icons/Work";
import SortIcon from "@material-ui/icons/Sort";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { format } from "date-fns";
import { fetchProcessCaseOverrides } from "../../services/slices/ProcessCaseOverrides";
import TableIcons from "../table/TableIcons";
import { logDebug, logError } from "../../utils/Logger";
import GetProcessCaseOverridesSelector from "../../services/selectors/GetProcessCaseOverridesSelector";
import GetProcessSelector from "../../services/selectors/GetProcessSelector";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      width: 600,
    },
  },
  error: {
    color: theme.palette.error.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  nowrap: {
    display: "flex",
    whiteSpace: "nowrap",
    overflow: "auto",
  },
}));

interface OverridesProps {
  onCaseSelected: (caseID: string) => void;
}

export default function Overrides({
  onCaseSelected,
}: OverridesProps): JSX.Element {
  logDebug("Overrides", "Start");

  const dispatch = useDispatch();

  const { processName } = useParams();

  const process = GetProcessSelector(processName);

  const alignment = "left";

  let data = [] as any;

  const overridesData = GetProcessCaseOverridesSelector();

  if (overridesData && Array.isArray(overridesData.payload)) {
    const newData = [...overridesData.payload];

    data = newData.map((overrideItem) => {
      const formattedDate = format(
        new Date(overrideItem.created_at),
        "dd-MMM-yyyy HH:mm:ss"
      );

      return {
        caseId: overrideItem.case.id,
        ruleName: `${overrideItem.rule.current_version.rule} - ${overrideItem.rule.current_version.name}`,
        overrideReason: overrideItem.override_reason,
        applied: overrideItem.applied,
        createdAt: formattedDate,
      };
    });
  }
  const classes = useStyles();

  function handleSelectedRow(
    selectedRow:
      | {
          OverrideModel;
        }
      | any
  ) {
    if (selectedRow) {
      const { caseId } = selectedRow;

      logDebug("Overrides", `handleSelectedRow caseId=${caseId}`);

      onCaseSelected(`${caseId}?from=overrides`);
    }
  }

  useEffect(() => {
    if (process) {
      logDebug(
        "ProcessOverrides",
        `Fetching Overrides processId=${process.id}`
      );
      dispatch(fetchProcessCaseOverrides(process.id));
    } else {
      logError("ProcessOverrides", "Process is null!");
    }
  }, []);

  useEffect(() => {
    if (overridesData.error) {
      logError("ProcessOverrides", "Could not load Process Overrides");
    }
  }, [overridesData.error]);

  return (
    <>
      {overridesData.error && (
        <Alert
          severity="error"
          aria-label="Load Process Overrides Error Message"
        >
          There has been an error loading the Overrides
        </Alert>
      )}
      {!overridesData.error && (
        <div className={classes.container} data-testid="processOverrides">
          <MaterialTable
            title=""
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
                title: "Date Time",
                field: "createdAt",
                cellStyle: {
                  whiteSpace: "nowrap",
                },
                render: (rowData, type) => {
                  if (type === "row") {
                    return (
                      <div className={classes.nowrap} data-testid="createdAt">
                        <SubjectIcon fontSize="small" color="primary" />
                        {rowData.createdAt}
                      </div>
                    );
                  }
                  return rowData;
                },
              },
              {
                title: "Case ID",
                field: "caseId",
                render: (rowData, type) => {
                  if (type === "row") {
                    return (
                      <div className={classes.nowrap}>
                        <WorkIcon fontSize="small" color="primary" />
                        {rowData.caseId}
                      </div>
                    );
                  }
                  return rowData;
                },
              },
              {
                title: "Rule Name",
                field: "ruleName",
                render: (rowData, type) => {
                  if (type === "row") {
                    return (
                      <div className={classes.nowrap}>
                        <SortIcon fontSize="small" color="primary" />
                        {rowData.ruleName}
                      </div>
                    );
                  }
                  return rowData;
                },
              },
              {
                title: "Applied/Removed",
                field: "applied",
                lookup: { true: "Applied", false: "Removed" },
                render: (rowData, type) => {
                  if (type === "row") {
                    return (
                      <div className={classes.nowrap}>
                        {rowData.applied === true && (
                          <CheckCircleOutlineOutlinedIcon
                            fontSize="small"
                            className={classes.success}
                          />
                        )}
                        {rowData.applied === false && (
                          <HighlightOffOutlinedIcon
                            fontSize="small"
                            className={classes.error}
                          />
                        )}
                        {rowData.applied === true ? "Applied" : "Removed"}
                      </div>
                    );
                  }
                  return rowData;
                },
              },
              {
                title: "Reason",
                field: "overrideReason",
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
              exportFileName: "overrides",
              pageSize: 10,
              grouping: true,
            }}
          />
        </div>
      )}
    </>
  );
}
