import { getTheme, getLightTheme, getDarkTheme } from "./ThemeManager";

test("getTheme Dark", () => {
  const theme = getTheme("dark");
  expect(theme.palette.type).toEqual("dark");
});

test("getTheme Light", () => {
  const theme = getTheme("light");
  expect(theme.palette.type).toEqual("light");
});

test("getAppDarkTheme", () => {
  const theme = getDarkTheme();
  expect(theme.palette.type).toEqual("dark");
});

test("getLightTheme", () => {
  const theme = getLightTheme();
  expect(theme.palette.type).toEqual("light");
});
