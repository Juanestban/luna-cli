#!/usr/bin/env node

const { existsSync } = require('node:fs');
const { bgRed, white } = require('picocolors');
const path = require('node:path');

function start() {
  const indexFile = path.join(__dirname, '..', '/dist/index.cjs');

  if (!existsSync(indexFile)) {
    console.log(
      bgRed(
        `[-] ${white(
          'Error, missing build the luna-cli for have dist folder with there index file',
        )}`,
      ),
    );
    return;
  }

  return require(indexFile);
}

start();
