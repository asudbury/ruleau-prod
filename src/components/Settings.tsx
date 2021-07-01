/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import Switch from "@material-ui/core/Switch";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { IconButton, Link, Typography } from "@material-ui/core";
import SettingsIcon from "./icons/SettingsIcon";
import { version as appVersion } from "../../package.json";
import LogLevel from "./LogLevel";
import History from "../utils/History";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Settings(props: {
  themeName: string;
  onDarkModeChange: () => void;
}) {
  const { themeName, onDarkModeChange } = props;

  function onViewLog(popupState: { close: () => void }) {
    popupState.close();
    History.push("/log");
  }

  return (
    <PopupState variant="popover">
      {(popupState: any) => (
        <div>
          <IconButton
            edge="end"
            color="inherit"
            data-testid="settingsIcon"
            aria-label="settings icon"
            {...bindTrigger(popupState)}
          >
            <SettingsIcon fontSize="large" />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              style: { width: "300" },
            }}
          >
            <List>
              <ListItem>
                <ListItemText primary="Dark Mode" />
                <Switch
                  onChange={onDarkModeChange}
                  checked={themeName === "dark"}
                  data-testid="darkModeSwitcher"
                  aria-label="dark mode switcher"
                  color="primary"
                />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemText primary="Log Level" style={{ minWidth: 100 }} />
                <LogLevel />
              </ListItem>
              <ListItem>
                <Link
                  href="#"
                  variant="body2"
                  data-testid="viewLogLink"
                  aria-label="View Log link"
                  onClick={() => {
                    onViewLog(popupState);
                  }}
                >
                  View Log
                </Link>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant="caption">Version</Typography>
                </ListItemText>
                <Typography variant="caption">{appVersion}</Typography>
              </ListItem>
            </List>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
