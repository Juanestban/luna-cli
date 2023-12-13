# lun-cli

new package for created a specified react component using typescript or javascript

## install

with npm

```sh
npm install lun-cli
```

with yarn

```sh
yarn add lun-cli
```

with pnpm

```sh
pnpm add lun-cli
```

## commands

created component schema

```sh
lun-cli gc <component-name>
```

create page/view schema

```sh
lun-cli gp <view-name>
```

create context/provider schema

```sh
lun-cli gctx <provider-name>
```

### help command
```sh
### short way
lun-cli -h

### large way
lun-cli --help
```

## flags:

by default that flag will be like "react" (react javascript)
- `-t`
- `--template`

### examples

```sh
pnpm lun-cli <component> -t react-ts
```

```sh
pnpm lun-cli <component> --template react
```

## `defineLunConfig` and `lun.config.cjs` file
you can create a file for define by default the config for use **lun-cli** for generate **`components`**, **`views|pages`** and **`contexts|providers`**

```js
const { defineLunConfig } = require('lun-cli');

module.exports = defineLunConfig({
  root: 'src',
  pagesFolder: 'views',
  defaultTemplate: 'react-ts',
  provider: 'context',
  css: 'module',
});
```