import Commander from "commander";

export interface OptionValues extends Commander.OptionValues {
  /**
   * Current version of package.
   * @example
   * {
   *  current: "1.0.0"
   * }
   *
   * {
   *  current: "1.0.0-alpha.1"
   * }
   */
  current: string;

  /**
   * A flag whether bump up the version to major.
   */
  major?: boolean;

  /**
   * A flag whether bump up the version to minor.
   */
  minor?: boolean;

  /**
   * Next version of package.
   * @example
   * {
   *  next: "2.0.0"
   * }
   *
   * {
   *  next: "2.0.0-alpha.1"
   * }
   */
  next?: string;

  /**
   * Path of file that written info as json.
   * @example
   * {
   *  outputJson: "sebu.json"
   * }
   */
  outputJson: string;

  /**
   * A flag whether bump up the version to patch.
   */
  patch?: boolean;
  /**
   * Source file's path that target.
   * Possible glob pattern.
   * @example
   * {
   *  source: "docs/README.md"
   * }
   *
   * {
   *  source: "docs/*.md"
   * }
   */
  source: string;
  /**
   * A flag whether overwrite.
   */
  write?: boolean;
}
