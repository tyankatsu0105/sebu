import fs from "fs";

import { OptionValues } from "../types/commander";
import { InternalOptionValues } from "../types/internal";
import { getRelativePath, getUpdatedFileInfo, info } from "./utils";

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

    finish({
      current: internalOptionValues.current,
      next: internalOptionValues.next,
      updatedFileInfo,
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

    finish({
      current: internalOptionValues.current,
      next: internalOptionValues.next,
      updatedFileInfo,
    });
    return;
  }

  finish({
    current: internalOptionValues.current,
    next: internalOptionValues.next,
    updatedFileInfo,
  });
};

const finish = (params: {
  current: InternalOptionValues["current"];
  next: InternalOptionValues["next"];
  updatedFileInfo: ReturnType<typeof getUpdatedFileInfo>["updatedFileInfo"];
}) => {
  const filePath = params.updatedFileInfo
    .map((value) => {
      const icon = value.isUpdated ? "\uD83D\uDD3C" : "  ";
      return `${icon} ${value.path}`.trimEnd();
    })
    .join("\n")
    .trim();

  const updatedFileCount = params.updatedFileInfo.filter(
    ({ isUpdated }) => isUpdated
  ).length;
  info(`${updatedFileCount} of ${params.updatedFileInfo.length} files updated.
${params.current} => ${params.next}

${filePath}
  `);
};
