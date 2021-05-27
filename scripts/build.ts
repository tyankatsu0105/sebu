import * as ESBuild from "esbuild";
import glob from "glob";
import path from "path";

const root = path.resolve(__dirname, "../");

const entryPoints = glob.sync(path.join(root, "src/**/*.ts"));

const options: ESBuild.BuildOptions = {
  entryPoints,
  minify: true,
  bundle: true,
  target: "es2015",
  platform: "node",
  outdir: path.join(root, "dist"),
  tsconfig: path.join(root, "tsconfig.json"),
};

ESBuild.build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
