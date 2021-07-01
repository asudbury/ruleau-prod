import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

// eslint-disable-next-line import/prefer-default-export
export const themeOptions: ThemeOptions = {
  palette: {
    type: "dark",
    background: {
      default: "#161617",
    },
    primary: {
      main: "#12dcff",
      dark: "#12C370",
      light: "#B9FFC9",
      contrastText: "#1C1C1C",
    },
    secondary: {
      main: "#12dcff",
      dark: "#006664",
      light: "#41E4FF",
    },
    text: {
      secondary: "#B7B7B7",
      disabled: "#414348",
      hint: "#B7B7B7",
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
        backgroundColor: "#1c1c1c",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#1c1c1c",
      },
    },
  },
};
