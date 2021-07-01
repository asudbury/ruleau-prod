import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

// eslint-disable-next-line import/prefer-default-export
export const themeOptions: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#12dcff",
      dark: "#17764a",
      light: "#75ff96",
      contrastText: "#1c1c1c",
    },
    secondary: {
      main: "#12dcff",
      dark: "#003332",
    },
    text: {
      secondary: "#b7b7b7",
      disabled: "#414348",
      hint: "#b7b7b7",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    caption: {
      fontWeight: 400,
    },
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    overline: {
      fontWeight: 400,
    },
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#161617",
        color: "#ffff",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "2em",
      },
    },
    MuiTabs: {
      indicator: {
        height: "0.3em",
      },
    },
    MuiTab: {
      wrapper: {
        flexDirection: "row",
      },
      root: {
        backgroundColor: "#161617",
        color: "#0000000",
      },
    },
    MuiSvgIcon: {
      root: {
        width: "1.3em",
      },
    },
    MuiCard: {
      root: {
        borderRadius: "0.8em",
        backgroundColor: "#fafafa",
      },
    },
  },
};
