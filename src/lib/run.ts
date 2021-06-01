import fs from "fs";

import { OptionValues } from "../types/commander";
import { getUpdatedFileInfo } from "./utils";

export const run = (optionValues: OptionValues) => {
  const { updatedFileInfo } = getUpdatedFileInfo(optionValues);

  if (optionValues.write) {
    fs.writeFileSync(updatedFileInfo.path, updatedFileInfo.content.next);
    return;
  }

  if (optionValues.dryRun) {
    console.info(updatedFileInfo);

    return;
  }

  console.log(updatedFileInfo.content.next);
};
