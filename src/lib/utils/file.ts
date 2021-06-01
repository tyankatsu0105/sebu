import fs from "fs";
import glob from "glob";
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

export const getUpdatedFileInfo = (optionValues: OptionValues) => {
  const files = glob.sync(optionValues.source);

  const updatedFileInfo = files.map((file) => {
    const { content: current, path } = getCurrentFileInfo({
      source: file,
    });
    const { updatedContent: next } = getUpdatedContent({
      currentContent: current,
      currentVersion: optionValues.current,
      nextVersion: optionValues.next,
    });

    return {
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
  });
  return { updatedFileInfo };
};
