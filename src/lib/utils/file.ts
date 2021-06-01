import fs from "fs";
import * as NodePath from "path";

import { OptionValues } from "../../types/commander";

export const getRelativePath = (path: string) => {
  const relativePath = NodePath.resolve(process.cwd(), path);

  return { relativePath };
};

export const getCurrentFileInfo = (params: {
  source: OptionValues["source"];
}) => {
  const path = getRelativePath(params.source).relativePath;
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

type UpdatedFileInfo = {
  content: {
    current: string;
    next: string;
  };
  path: string;
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

  const updatedFileInfo: { parsed: UpdatedFileInfo; pure: UpdatedFileInfo } = {
    parsed: {
      content: {
        current: JSON.parse(current),
        next: JSON.parse(next),
      },
      path,
    },

    pure: {
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
    },
  };

  return { updatedFileInfo };
};
