import fs from "fs";
import * as NodePath from "path";

import { OptionValues } from "../../types/commander";

export const getCurrentFileInfo = (params: {
  source: OptionValues["source"];
}) => {
  const path = NodePath.resolve(process.cwd(), params.source);
  const content = fs
    .readFileSync(NodePath.resolve(process.cwd(), params.source))
    .toString();

  return {
    content,
    path,
  };
};

export const getUpdatedContent = (params: {
  currentContent: string;
  currentVersion: OptionValues["current"];
  nextVersion: OptionValues["next"];
}) => {
  const regexp = new RegExp(
    `(?<!(\\d|\\.))${params.currentVersion}(?!(\\d|\\.))`,
    "g"
  );

  const updatedContent = params.currentContent.replace(
    regexp,
    params.nextVersion
  );

  return { updatedContent };
};

export const getUpdatedFileInfo = (optionValues: OptionValues) => {
  const { content: current, path } = getCurrentFileInfo({
    source: optionValues.source,
  });
  const { updatedContent: next } = getUpdatedContent({
    currentContent: current,
    currentVersion: optionValues.current,
    nextVersion: optionValues.next,
  });

  const updatedFileInfo = {
    /**
     * File content
     */
    content: {
      current,
      next,
    },
    /**
     * Absolute path
     * @example '/Users/tyankatsu/project/sebu/sandbox/docs/package.json'
     */
    path,
  };

  return { updatedFileInfo };
};
