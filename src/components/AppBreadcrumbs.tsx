/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import BallotIcon from "@material-ui/icons/Ballot";
import useUrlManager from "../hooks/UseUrlManager";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
}));

// eslint-disable-next-line no-shadow
export enum Page {
  ProcessPage,
  CasePage,
}

interface AppBreadcrumbsProps {
  page: Page;
}

export default function AppBreadcrumbs({
  page,
}: AppBreadcrumbsProps): JSX.Element {
  const [publicUrl, processName, formattedProcessName, id] = useUrlManager();

  const classes = useStyles();

  const history = useHistory();

  function handleGoHome(event: { preventDefault: () => void }) {
    event.preventDefault();
    history.push(publicUrl);
  }

  function handleProcessPage(event: { preventDefault: () => void }) {
    event.preventDefault();
    const url = `${publicUrl}/process/${processName}`;
    history.push(url);
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" data-testid="breadcrumbs">
      <Link
        href="#"
        data-testid="goHome"
        aria-label="Go Home link"
        onClick={handleGoHome}
        className={classes.link}
        color="textPrimary"
      >
        <HomeIcon color="primary" className={classes.icon} fontSize="small" />
        Home
      </Link>
      {page === Page.ProcessPage && (
        <Typography className={classes.link}>
          <BallotIcon
            color="primary"
            className={classes.icon}
            fontSize="small"
          />
          {formattedProcessName}
        </Typography>
      )}
      {page === Page.CasePage && (
        <Link
          href="#"
          data-testid="goToProcess"
          aria-label="Go to Process link"
          onClick={handleProcessPage}
          className={classes.link}
          color="textPrimary"
        >
          <BallotIcon
            color="primary"
            className={classes.icon}
            fontSize="small"
          />
          {formattedProcessName}
        </Link>
      )}
      {page === Page.CasePage && (
        <Typography className={classes.link}>
          <WorkIcon color="primary" className={classes.icon} fontSize="small" />
          {id}
        </Typography>
      )}
    </Breadcrumbs>
  );
}
