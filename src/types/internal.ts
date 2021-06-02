import { OptionValues } from "./commander";

export type InternalOptionValues = Omit<OptionValues, "next"> & {
  next: string;
};
