import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import HomePage from "./pages/HomePage";
import ProcessPage from "./pages/ProcessPage";
import CasePage from "./pages/CasePage";
import PageNotFound from "./components/PageNotFound";
import Error from "./components/Error";
import TestComponent from "./components/TestComponent";
import LogViewer from "./components/LogViewer";
import { logError, logWarning, logDebug } from "./utils/Logger";

const errorHandler = (error: Error, info: { componentStack: string }) => {
  logError("ErrorHandler", error.toString());
  logWarning("ErrorHandler", info.toString());
};

export default function Routes(): JSX.Element {
  logDebug("Routes", "Start");

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <ErrorBoundary FallbackComponent={Error} onError={errorHandler}>
              <HomePage />
            </ErrorBoundary>
          )}
        />
        <Route
          exact
          path={["/process/:processName", "/process/:processName/:processTab"]}
          render={() => (
            <ErrorBoundary FallbackComponent={Error} onError={errorHandler}>
              <ProcessPage />
            </ErrorBoundary>
          )}
        />
        <Route
          exact
          path="/process/:processName/case/:id"
          render={() => (
            <ErrorBoundary FallbackComponent={Error} onError={errorHandler}>
              <CasePage />
            </ErrorBoundary>
          )}
        />
        <Route exact path="/log" component={LogViewer} />
        <Route exact path="/error" component={Error} />
        {process.env.NODE_ENV === "development" && (
          <Route exact path="/test" component={TestComponent} />
        )}
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}
