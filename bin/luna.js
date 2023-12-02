#!/usr/bin/env node

const { existsSync } = require('node:fs');
const { bgRed, white } = require('picocolors');
const path = require('node:path');

function start() {
  const cliFile = path.join(__dirname, '..', '/dist/cli.cjs');

  if (!existsSync(cliFile)) {
    console.log(
      bgRed(
        `[-] ${white(
          'Error, missing build the luna-cli for have dist folder with there cli file - [dist/cli.ts]',
        )}`,
      ),
    );
    return;
  }

  return require(cliFile);
}

start();
