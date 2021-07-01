import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  ThemeProvider,
  CssBaseline,
  Hidden,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";

import createPersistedState from "use-persisted-state";
import LogoIcon from "./components/icons/LogoIcon";
import { getTheme } from "./themes/ThemeManager";
import Routes from "./Routes";
import ProcessList from "./components/ProcessList";
import LoggedOutStatus from "./components/login/LoggedOutStatus";
import Settings from "./components/Settings";
import { logDebug } from "./utils/Logger";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logoButton: {
    marginRight: theme.spacing(1),
  },
}));

function App(): JSX.Element {
  logDebug("App", "Start");

  const classes = useStyles();

  const useAppTheme = createPersistedState("appTheme");
  const [appTheme, setAppTheme] = useAppTheme("dark");

  const theme = getTheme(appTheme);

  function handleHomePage() {
    logDebug("App", "handleHomePage");
    window.location.href = "/";
  }

  function onToggleTheme() {
    logDebug("App", "onToggleTheme");
    setAppTheme(appTheme === "dark" ? "light" : "dark");
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              data-testid="homePageIcon"
              aria-label="home page"
              onClick={handleHomePage}
            >
              <LogoIcon fontSize="large" className={classes.logoButton} />
            </IconButton>
            <Typography
              variant="h6"
              onClick={handleHomePage}
              data-testid="ruleauLabel"
              aria-label="ruleau label"
            >
              Ruleau
            </Typography>
            <Hidden only={["xs"]}>
              <Box ml={10}>
                <ProcessList />
              </Box>
            </Hidden>
            <div className={classes.grow} />
            <div>
              <Settings themeName={appTheme} onDarkModeChange={onToggleTheme} />
            </div>
            <div>
              <LoggedOutStatus />
            </div>
          </Toolbar>
          <Hidden only={["sm", "md", "lg", "xl"]}>
            <Toolbar>
              <Box>
                <ProcessList />
              </Box>
            </Toolbar>
          </Hidden>
        </AppBar>
        <Routes />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
