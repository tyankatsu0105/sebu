<p align="center"><img width="143px" height="130px" src="https://raw.githubusercontent.com/tyankatsu0105/sebu/main/assets/logo.png" alt="sebu"></p>

<h2 align="center">sebu</h2>
<p align="center">
  SEarch files and BUmp up version
</p>
<p align="center">
  <a title="Current version" href="https://badge.fury.io/js/sebu" rel="nofollow">
    <img src="https://badge.fury.io/js/sebu.svg">
  </a>
  <a title="deploy" href="https://github.com/algolia/shipjs" rel="nofollow">
    <img src="https://img.shields.io/badge/deploy-🛳Ship.js-blue?style=flat">
  </a>
  <a title="MIT License" href="[LICENSE](https://opensource.org/licenses/MIT)" rel="nofollow">
    <img src="https://img.shields.io/badge/License-MIT-green.svg">
  </a>
  <br>
  <br>
</p>


## Usage

```bash
npm install sebu
```

### CLI

```bash
sebu --current=0.0.0 --next=2.0.0 --source=docs/README.md

# Also available experimental release version like beta, rc
sebu --current=1.0.0-beta.1 --next=1.0.0-beta.2 --source=docs/README.md
```

```bash
Usage: sebu [options]

Options:
  --source <path>           source path. Also be able to use glob.
  --current <version>       current version of package. ex)1.0.0
  --next <version>          next version of package. ex)1.0.1
  --major                   bump up the version to major
  --minor                   bump up the version to minor
  --patch                   bump up the version to patch
  -w, --write               overwrite source
  -o, --output-json <path>  create file that written info as json
  -h, --help                display help for command

Example:
$ sebu --current=1.0.0 --next=1.0.1 --source=docs/README.md -w
$ sebu --current=1.0.0 --next=1.0.1 --source="docs/**/*.md"
$ sebu --current=1.0.0 --next=1.0.1 --source="src/**/*.*"
$ sebu --current=1.0.0 --major --source=package.json
$ sebu --current=1.0.0 --next=1.0.1 --source="docs/**/*.md" -o sebu.json
```

### API

```ts
import sebu from "sebu";

// 👍
sebu.XXXX
```

see [export API](https://github.com/tyankatsu0105/sebu/blob/main/src/lib/index.ts)

## LICENSE(MIT)
see [LICENSE](https://github.com/tyankatsu0105/sebu/blob/main/LICENSE)