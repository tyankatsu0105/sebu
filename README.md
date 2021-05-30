<h2 align="center">sebu</h2>
<p align="center">
  SEarch files and BUmp up version
</p>
<p align="center">
  <a title="Current version" href="https://badge.fury.io/js/sebu" rel="nofollow">
    <img src="https://badge.fury.io/js/sebu.svg">
  </a>
  <a title="deploy" href="https://github.com/algolia/shipjs" rel="nofollow">
    <img src="https://img.shields.io/badge/deploy-🛳%20Ship.js-blue?style=flat">
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

### API

```ts
import sebu from "sebu";

// 👍
sebu.XXXX
```

see [export API](https://github.com/tyankatsu0105/sebu/blob/main/src/lib/index.ts)

## Development

```bash
npm run dev -- --current=1.1.1@alfa --next=2.0.0 --source=README.md
```

```bash
source scripts/setup-sandbox.sh

npx sebu --help
```

## LICENSE(MIT)
see [LICENSE](https://github.com/tyankatsu0105/sebu/blob/main/LICENSE)