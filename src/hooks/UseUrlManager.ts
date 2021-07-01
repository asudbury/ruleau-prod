import { useParams } from "react-router-dom";
import { logDebug } from "../utils/Logger";

export default function useUrlManager(): any {
  const publicUrl = process.env.PUBLIC_URL;
  const { processName, id } = useParams();
  let formattedProcessName = "";

  if (processName) {
    logDebug("useUrlManager", `processName=${processName}`);

    formattedProcessName = processName.replace(new RegExp("-", "g"), " ");

    if (id) {
      logDebug("useUrlManager", `id=${id}`);
    }
  }

  return [publicUrl, processName, formattedProcessName, id];
}
