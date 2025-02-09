import { createRequire } from 'node:module';
import fs from 'node:fs';

import { defaultConfig, extsConfigFile } from '../constants';
import { getRootPath } from './path';
import { LunConfig } from '../models';

export const getOptions = () => {
  return new Promise<LunConfig>(async (resolve) => {
    const searchingFile = extsConfigFile.map((ext) => {
      const configPath = getRootPath(`lun.config.${ext}`);
      return fs.existsSync(configPath) ? configPath : false;
    });

    if (searchingFile.some((cond) => typeof cond === 'string')) {
      const configPath = searchingFile.find((cond) => typeof cond === 'string') as string;
      let options;

      if (configPath.includes('.mjs')) {
        options = (await import(configPath)).default;
      }

      if (configPath.includes('.cjs')) {
        const require = createRequire(import.meta.url);
        options = require(configPath) as LunConfig;
      }

      resolve(options);
    } else resolve(defaultConfig);
  });
};
