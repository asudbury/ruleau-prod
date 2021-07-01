import React from "react";
import { useHistory } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  makeStyles,
} from "@material-ui/core";
import BallotIcon from "@material-ui/icons/Ballot";
import WorkIcon from "@material-ui/icons/Work";
import SubjectIcon from "@material-ui/icons/Subject";
import SortIcon from "@material-ui/icons/Sort";
import { logDebug } from "../../utils/Logger";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 180,
  },
}));

interface ProcessCardProps {
  processId: number;
  title: string;
  description: string;
}

export default function ProcessCard({
  processId,
  title,
  description,
}: ProcessCardProps): JSX.Element {
  logDebug("ProcessCard", `processId=${processId} title=${title}`);

  const classes = useStyles();
  const history = useHistory();

  function getFormattedTitle(titleString: string) {
    return encodeURIComponent(titleString.replace(new RegExp(" ", "g"), "-"));
  }

  function onCases() {
    handlePush("cases");
  }

  function onOverrides() {
    handlePush("overrides");
  }

  function onRules() {
    handlePush("rules");
  }

  function handlePush(tab) {
    const formattedTitle = getFormattedTitle(title);

    logDebug("ProcessCard", `handlePush tab=${tab} title=${formattedTitle}`);
    history.push(`/process/${formattedTitle}/${tab}`);
  }

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<BallotIcon color="primary" />}
        title={title}
        titleTypographyProps={{ color: "primary", variant: "h6" }}
        subheader={description}
        data-testid="cardTitle"
      />
      <Box p={1}>
        <Divider />
      </Box>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item>
            <FormControl className={classes.formControl}>
              <Button
                data-testid="casesButton"
                aria-label="Cases Button"
                className={classes.formControl}
                variant="outlined"
                color="primary"
                startIcon={<WorkIcon color="action" />}
                onClick={onCases}
              >
                Cases
              </Button>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <Button
                data-testid="overridesButton"
                aria-label="Overrides Button"
                className={classes.formControl}
                variant="outlined"
                color="primary"
                startIcon={<SubjectIcon color="action" />}
                onClick={onOverrides}
              >
                Overrides
              </Button>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <Button
                data-testid="rulesButton"
                aria-label="Rules Button"
                className={classes.formControl}
                variant="outlined"
                color="primary"
                startIcon={<SortIcon color="action" />}
                onClick={onRules}
              >
                Rules
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
