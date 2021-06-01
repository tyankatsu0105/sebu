import Commander from "commander";

import { run } from "../lib/run";
import { OptionValues } from "../types/commander";

const program = new Commander.Command();

program
  .requiredOption("--source <path>", "source path")
  .requiredOption("--current <version>", "current version of package. ex)1.0.0")
  .requiredOption("--next <version>", "next version of package. ex)1.0.1")
  .option("-w, --write", "overrite source")
  .option("-o, --output-json <path>", "create file that written info as json")
  .addHelpText(
    "after",
    `
Example:
$ sebu --current=1.0.0 --next=1.0.1 --source=docs/README.md`
  )
  .parse(process.argv);

const optionValues = program.opts() as OptionValues;

run(optionValues);
