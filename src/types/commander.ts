import Commander from "commander";

export interface OptionValues extends Commander.OptionValues {
  current: string;
  next: string;
  source: string;
}
