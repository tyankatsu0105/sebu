import fs from "fs";

import { OptionValues } from "../types/commander";
import { InternalOptionValues } from "../types/internal";
import { getRelativePath, getUpdatedFileInfo } from "./utils";

const getNextVersion = (optionValues: OptionValues) => {
  let nextVersion = "";

  if (optionValues.next) {
    nextVersion = optionValues.next;

    return { nextVersion };
  }

  let [major, minor, patch] = optionValues.current
    .split(".")
    .map((v) => Number(v));

  if (optionValues.major) {
    major += 1;

    /**
     * 0.1.5 => 1.0.0
     */
    nextVersion = [String(major), 0, 0].join(".");
    return { nextVersion };
  }
  if (optionValues.minor) {
    minor += 1;

    /**
     * 0.1.0 => 0.2.0
     */
    nextVersion = [String(major), String(minor), 0].join(".");
    return { nextVersion };
  }
  if (optionValues.patch) {
    patch += 1;

    /**
     * 0.1.5 => 0.1.6
     */
    nextVersion = [String(major), String(minor), String(patch)].join(".");
    return { nextVersion };
  }

  throw new Error("Use next or major or minor or patch option.");
};

export const run = (optionValues: OptionValues) => {
  const next = getNextVersion(optionValues)?.nextVersion;
  if (!next)
    throw new Error("Can't use next and major or minor or patch together.");

  const internalOptionValues: InternalOptionValues = {
    ...optionValues,
    next,
  };
  const { updatedFileInfo } = getUpdatedFileInfo(internalOptionValues);

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
