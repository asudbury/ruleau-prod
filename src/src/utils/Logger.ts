import log, { LogLevelDesc, getLevel, setLevel } from "loglevel";

const logDataEnabled = true;

// eslint-disable-next-line no-shadow
enum LoggingLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

function getTime(): string {
  const date = new Date();
  return `${date.toLocaleTimeString()}:${date
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
}

function getMessage(type: string, location: string, message: string): string {
  const time = getTime();
  const logMessage = `${time} ${type} ${location}::${message}`;

  if (logDataEnabled) {
    if (!(window as any).logData) {
      initLog();
    }

    (window as any).logData.unshift({
      time,
      type,
      location,
      message,
    });
  }

  return logMessage;
}

export function initLog(): void {
  (window as any).logData = [];
}

export function getLog(): any {
  return (window as any).logData;
}

export function getLoggingLevel(): number {
  return getLevel();
}

export function setLoggingLevel(level: LogLevelDesc): void {
  setLevel(level);
}

export function logError(location: string, message: string): void {
  log.error(getMessage("Error", location, message));
}

export function logWarning(location: string, message: string): void {
  if (getLoggingLevel() <= LoggingLevel.WARN) {
    log.warn(getMessage("Warning", location, message));
  }
}

export function logInfo(location: string, message: string): void {
  if (getLoggingLevel() <= LoggingLevel.INFO) {
    log.info(getMessage("Info", location, message));
  }
}

export function logDebug(location: string, message: string): void {
  if (getLoggingLevel() <= LoggingLevel.DEBUG) {
    log.debug(getMessage("Debug", location, message));
  }
}

export function logTrace(location: string, message: string): void {
  if (getLoggingLevel() <= LoggingLevel.TRACE) {
    log.trace(getMessage("Trace", location, message));
  }
}
