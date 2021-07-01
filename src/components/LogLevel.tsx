import React, { useState } from "react";
import {
  makeStyles,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { LogLevelDesc } from "loglevel";
import { getLoggingLevel, setLoggingLevel } from "../utils/Logger";

const useStyles = makeStyles(() => ({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    display: "flex",
    alignItems: "center",
  },
  listItemIcon: {
    minWidth: 30,
  },
}));

export default function LogLevel(): JSX.Element {
  const classes = useStyles();
  const [logLevel, setLogLevel] = useState(getLoggingLevel());

  const levels: { [level: string]: string } = {
    "4": "error",
    "3": "warn",
    "2": "info",
    "1": "debug",
    "0": "trace",
  };

  const handleLogLevelChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLogLevel(event.target.value as number);

    const newLevel = event.target.value as string;

    const newLevelDesc = levels[newLevel] as LogLevelDesc;

    setLoggingLevel(newLevelDesc);
  };

  return (
    <Select
      value={logLevel}
      data-testid="logLevelSelect"
      aria-label="Log Level Select"
      onChange={handleLogLevelChange}
    >
      <MenuItem value="4">
        <div className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <EventNoteIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Error" />
        </div>
      </MenuItem>
      <MenuItem value="3">
        <div className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <EventNoteIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Warning" />
        </div>
      </MenuItem>
      <MenuItem value="2">
        <div className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <EventNoteIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Info" />
        </div>
      </MenuItem>
      <MenuItem value="1">
        <div className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <EventNoteIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Debug" />
        </div>
      </MenuItem>
      <MenuItem value="0">
        <div className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <EventNoteIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Trace" />
        </div>
      </MenuItem>
    </Select>
  );
}
