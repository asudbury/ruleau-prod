import React from "react";
import { IconButton } from "@material-ui/core";
import AccountIcon from "../icons/AccountIcon";

export default function LoggedOutStatus(): JSX.Element {
  return (
    <div>
      <IconButton
        data-testid="loggedOutStatusIcon"
        edge="end"
        color="inherit"
        aria-label="account icon"
      >
        <AccountIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
