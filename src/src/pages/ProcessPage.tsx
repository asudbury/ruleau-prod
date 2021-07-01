import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppBar, Box, Tabs, Tab } from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import SubjectIcon from "@material-ui/icons/Subject";
import SortIcon from "@material-ui/icons/Sort";
import AppBreadcrumbs, { Page } from "../components/AppBreadcrumbs";
import Overrides from "../components/process/Overrides";
import LabelAndValue from "../components/core/LabelAndValue";
import CasesContainer from "../containers/CasesContainer";
import Rules from "../components/process/Rules";
import GetProcessSelector from "../services/selectors/GetProcessSelector";
import useUrlManager from "../hooks/UseUrlManager";
import { logDebug } from "../utils/Logger";

export default function ProcessPage(): JSX.Element {
  logDebug("ProcessPage", "Start");

  const history = useHistory();
  const { processName, processTab } = useParams();
  const [publicUrl, formattedProcessName] = useUrlManager();

  const process = GetProcessSelector(processName);

  // eslint-disable-next-line no-shadow
  enum TabValue {
    CasesTab,
    OverridesTab,
    RulesTab,
  }

  let selectedTabValue = TabValue.CasesTab;

  if (processTab === "overrides") {
    selectedTabValue = TabValue.OverridesTab;
  } else if (processTab === "rules") {
    selectedTabValue = TabValue.RulesTab;
  }
  const [tabValue, setTabValue] = useState<TabValue>(selectedTabValue);

  const handleTabChange = (event: React.ChangeEvent<any>, value: number) => {
    setTabValue(value);
  };

  function onCaseSelected(caseID: string) {
    logDebug("ProcessPage", `onCaseSelected caseId=${caseID}`);

    const url = `${publicUrl}/process/${encodeURIComponent(
      formattedProcessName
    )}/case/${caseID}`;

    logDebug("ProcessPage", `onCaseSelected url=${url}`);

    history.push(url);
  }
  return (
    <div>
      <Box ml={5} mt={1} mr={1}>
        <AppBreadcrumbs page={Page.ProcessPage} />
      </Box>
      <Box ml={5} mt={1} mr={5}>
        {process && (
          <LabelAndValue variant="h6" label="Process" value={process.name} />
        )}

        <AppBar position="static">
          <Tabs
            data-testid="processTabs"
            indicatorColor="primary"
            textColor="primary"
            value={tabValue}
            aria-label="process tabs"
            onChange={handleTabChange}
          >
            <Tab
              icon={<WorkIcon />}
              label="Cases"
              value={TabValue.CasesTab}
              data-testid="casesTab"
            />
            <Tab
              icon={<SubjectIcon />}
              label="Overrides"
              value={TabValue.OverridesTab}
            />
            <Tab icon={<SortIcon />} label="Rules" value={TabValue.RulesTab} />
          </Tabs>
        </AppBar>
        {tabValue === TabValue.CasesTab && <CasesContainer />}
        {tabValue === TabValue.OverridesTab && (
          <Overrides onCaseSelected={onCaseSelected} />
        )}
        {tabValue === TabValue.RulesTab && <Rules />}
      </Box>
    </div>
  );
}
