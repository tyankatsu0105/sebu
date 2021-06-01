import fs from "fs";

import { OptionValues } from "../types/commander";
import { getRelativePath, getUpdatedFileInfo } from "./utils";

export const run = (optionValues: OptionValues) => {
  const { updatedFileInfo } = getUpdatedFileInfo(optionValues);

  if (optionValues.write) {
    updatedFileInfo.forEach((content) => {
      fs.writeFileSync(content.path, content.content.next);
    });

    return;
  }

  if (optionValues.outputJson) {
    fs.writeFileSync(
      getRelativePath(optionValues.outputJson).relativePath,
      JSON.stringify({ data: updatedFileInfo }, null, 2),
      {
        encoding: "utf8",
      }
    );

    return;
  }
};
