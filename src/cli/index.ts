import Commander from "commander";

import { run } from "../lib/run";
import { OptionValues } from "../types/commander";

const program = new Commander.Command();

program
  .requiredOption("--source <path>", "source path. Also be able to use glob.")
  .requiredOption("--current <version>", "current version of package. ex)1.0.0")
  .option("--next <version>", "next version of package. ex)1.0.1")
  .option("--major", "bump up the version to major")
  .option("--minor", "bump up the version to minor")
  .option("--patch", "bump up the version to patch")
  .option("-w, --write", "overwrite source")
  .option("-o, --output-json <path>", "create file that written info as json")
  .addHelpText(
    "after",
    `
Example:
$ sebu --current=1.0.0 --next=1.0.1 --source=docs/README.md
$ sebu --current=1.0.0 --next=1.0.1 --source="docs/**/*.md"
`
  )
  .parse(process.argv);

const optionValues = program.opts() as OptionValues;

run(optionValues);
