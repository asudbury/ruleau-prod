import React from "react";
import { Box } from "@material-ui/core";
import AppBreadcrumbs, { Page } from "../components/AppBreadcrumbs";
import CaseContainer from "../containers/CaseContainer";

export default function CasePage(): JSX.Element {
  return (
    <>
      <Box ml={5} mt={1} mr={1}>
        <AppBreadcrumbs page={Page.CasePage} />
      </Box>
      <CaseContainer />
    </>
  );
}
