import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Settings from "./Settings";

test("Render TestComponent", () => {
  const mockToggleTheme = jest.fn();

  const { getByTestId } = render(
    <Settings themeName="dark" onDarkModeChange={mockToggleTheme} />
  );

  const settingsIcon = getByTestId("settingsIcon");

  expect(settingsIcon).toBeInTheDocument();

  fireEvent.click(settingsIcon);

  const darkModeSwitcher = getByTestId("darkModeSwitcher");

  expect(darkModeSwitcher).toBeInTheDocument();

  fireEvent.click(darkModeSwitcher);

  fireEvent.click(settingsIcon);

  const viewLogLink = getByTestId("viewLogLink");

  expect(viewLogLink).toBeInTheDocument();

  fireEvent.click(viewLogLink);
});
