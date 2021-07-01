import React from "react";
import DashBoard from "../components/Dashboard";
import { logDebug } from "../utils/Logger";

export default function HomePage(): JSX.Element {
  logDebug("HomePage", "Start");
  return <DashBoard />;
}
