import Commander from "commander";

export interface OptionValues extends Commander.OptionValues {
  /**
   * Current version of package
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
   * Next version of package
   * @example
   * {
   *  next: "2.0.0"
   * }
   *
   * {
   *  next: "2.0.0-alpha.1"
   * }
   */
  next: string;

  /**
   * Source file's path that target
   * @example
   * {
   *  source: "docs/README.md"
   * }
   */
  source: string;
}
