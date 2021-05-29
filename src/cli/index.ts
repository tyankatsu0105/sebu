import Commander from "commander";
import { OptionValues } from "../types/commander";

const program = new Commander.Command();

program
  .requiredOption("--source <path>", "source path")
  .requiredOption("--current <version>", "current version of package. ex)1.0.0")
  .requiredOption("--next <version>", "next version of package. ex)1.0.1")
  .parse(process.argv)
  .addHelpText(
    "after",
    `
Example:
$ sebu --current=1.0.0 --next=1.0.1 --source=docs/README.md`
  );

const options = program.opts() as OptionValues;

console.log(options);
