import React, { useState } from "react";
import { matchPath } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { ListItemIcon, makeStyles } from "@material-ui/core";
import BallotIcon from "@material-ui/icons/Ballot";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetProcessesSelector from "../services/selectors/GetProcessesSelector";
import { ProcessModel } from "../services/models/ProcessesModel";
import { logDebug, logError } from "../utils/Logger";

const useStyles = makeStyles(() => ({
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemIcon: {
    minWidth: 30,
  },
}));

export default function ProcessList(): JSX.Element {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [secondaryText, setSecondaryText] = useState(getProcessName());

  const processes = GetProcessesSelector().payload as Array<ProcessModel>;

  function getProcessName() {
    const { processName } = getParams();

    if (processName) {
      return processName.replace(new RegExp("-", "g"), " ");
    }

    return "";
  }

  function getParams() {
    // eslint-disable-next-line no-shadow
    const segments = matchPath(window.location.pathname, {
      path: "/process/:processName",
    });
    return (segments && segments.params) || {};
  }

  function getFormattedValue(title: string) {
    if (title) {
      return title.replace(new RegExp(" ", "g"), "-");
    }

    return "";
  }

  const handleClickListItem = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    const item = processes[index];

    if (item) {
      logDebug("ProcessList", item.name);
      setSecondaryText(item.name);

      const url = `/process/${encodeURIComponent(
        getFormattedValue(item.name)
      )}`;

      logDebug("ProcessList", `url=${url}`);

      window.location.href = url;
    } else {
      logError("ProcessList", "Could not find item");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {processes.length > 1 && (
        <div>
          <List
            component="nav"
            data-testid="processList"
            aria-label="Process list"
            className={classes.noPadding}
          >
            <ListItem
              data-testid="processListItem"
              aria-label="Process list item"
              className={classes.noPadding}
              button
              aria-haspopup="true"
              onClick={(event) => handleClickListItem(event)}
            >
              <ListItemText primary="Process" secondary={secondaryText} />
              <ExpandMoreIcon />
            </ListItem>
          </List>
          <Menu
            data-testid="menu"
            aria-label="Menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {processes.map((process, index) => (
              <MenuItem
                data-testid={`menuItem${process.id}`}
                aria-label="Menu Item"
                key={process.id}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <BallotIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={process.name} />
                </div>
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </>
  );
}
