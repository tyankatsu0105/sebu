import fs from "fs";

import { OptionValues } from "../types/commander";
import { getRelativePath, getUpdatedFileInfo } from "./utils";

export const run = (optionValues: OptionValues) => {
  const { updatedFileInfo } = getUpdatedFileInfo(optionValues);

  if (optionValues.write) {
    fs.writeFileSync(
      updatedFileInfo.pure.path,
      updatedFileInfo.pure.content.next
    );
    return;
  }

  if (optionValues.outputJson) {
    fs.writeFileSync(
      getRelativePath(optionValues.outputJson).relativePath,
      JSON.stringify({ data: updatedFileInfo.parsed }, null, 2),
      {
        encoding: "utf8",
      }
    );

    return;
  }
};
