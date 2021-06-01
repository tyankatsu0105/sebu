import fs from "fs";

import { OptionValues } from "../types/commander";
import { getUpdatedFileInfo } from "./utils";

export const run = (optionValues: OptionValues) => {
  const { updatedFileInfo } = getUpdatedFileInfo(optionValues);

  if (optionValues.dryRun) {
    console.info(updatedFileInfo);

    return;
  }

  fs.writeFileSync(updatedFileInfo.path, updatedFileInfo.content.next);
};
