import * as ESBuild from "esbuild";
import glob from "glob";
import path from "path";

const root = path.resolve(__dirname, "../");

const entryPoints = glob.sync(path.join(root, "src/**/*.ts"));

const options: ESBuild.BuildOptions = {
  bundle: true,
  entryPoints,
  minify: true,
  outdir: path.join(root, "dist"),
  platform: "node",
  target: "es2015",
  tsconfig: path.join(root, "tsconfig.json"),
};

ESBuild.build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
