#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { bgRed, white } from 'picocolors';

function start() {
  const indexFile = '../dist/index.mjs';
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

  return import(indexFile);
}

start();
