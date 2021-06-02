import fs from "fs";
import glob from "glob";
import * as NodePath from "path";

import { InternalOptionValues } from "../../types/internal";

export const getRelativePath = (path: string) => {
  const relativePath = NodePath.resolve(process.cwd(), path);

  return { relativePath };
};

export const getCurrentFileInfo = (params: {
  source: InternalOptionValues["source"];
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
  currentVersion: InternalOptionValues["current"];
  nextVersion: InternalOptionValues["next"];
}) => {
  const regexp = new RegExp(
    `(?<!(\\d|\\.))${params.currentVersion}(?!(\\d|\\.))`,
    "g"
  );

  const updatedContent = params.currentContent.replace(
    regexp,
    params.nextVersion
  );

  const isUpdated = params.currentContent !== updatedContent;

  return { isUpdated, updatedContent };
};

export const getUpdatedFileInfo = (
  internalOptionValues: InternalOptionValues
) => {
  const files = glob.sync(internalOptionValues.source);

  const updatedFileInfo = files.map((file) => {
    const { content: current, path } = getCurrentFileInfo({
      source: file,
    });
    const { isUpdated, updatedContent: next } = getUpdatedContent({
      currentContent: current,
      currentVersion: internalOptionValues.current,
      nextVersion: internalOptionValues.next,
    });

    return {
      content: {
        current,
        next,
      },

      isUpdated,
      /**
       * Absolute path
       * @example '/Users/tyankatsu/project/sebu/sandbox/docs/package.json'
       */
      path,
    };
  });
  return { updatedFileInfo };
};
