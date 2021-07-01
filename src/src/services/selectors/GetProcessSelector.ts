import GetProcessesSelector from "./GetProcessesSelector";
import { logDebug, logError } from "../../utils/Logger";
import { ProcessModel } from "../models/ProcessesModel";

export default function GetProcessSelector(
  processKey: string
): ProcessModel | null {
  logDebug("GetProcessSelector", `key=${processKey}`);
  const processes = GetProcessesSelector();

  if (processes && processes.payload) {
    if (Array.isArray(processes.payload)) {
      const name = processKey.replace(new RegExp("-", "g"), "");

      return processes.payload.find((item) => {
        return item.name.replace(new RegExp("-| ", "g"), "") === name;
      });
    }
  }

  logError("GetProcessSelector", "No match!");

  return null;
}
