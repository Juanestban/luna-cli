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
lun-cli <component-name>
```

## flags:

by default that flag will be like "react" (react javascript)
- -t
- --template

### examples

```sh
pnpm lun-cli <component> -t react-ts
```

```sh
pnpm lun-cli <component> --template react
```