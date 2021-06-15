# assemblyscript-compile-cli
assemblyscript to wasm cli

## Usage

### tsconfig

```json
{
  "extends": "./node_modules/assemblyscript/tsconfig.assembly.json",
  "include": ["./**/*.ts"]
}
```

### install

```bash
yarn add assemblyscript-compile-cli
```

### run

```bash
MODEL_PATH=./models node ./assemblyscript-compile-cli/index.js
```

## TODO

* [ ] add bin
