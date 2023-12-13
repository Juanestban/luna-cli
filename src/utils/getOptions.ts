import fs from 'node:fs';

import { defaultConfig, extsConfigFile } from '../constants';
import { getRootPath } from './path';
import { LunConfig } from '../models';

export const getOptions = () => {
  return new Promise<LunConfig>(async (resolve, reject) => {
    try {
      const searchingFile = extsConfigFile.map((ext) => {
        const configPath = getRootPath(`lun.config.${ext}`);
        return fs.existsSync(configPath) ? configPath : false;
      });
      if (searchingFile.some((cond) => typeof cond === 'string')) {
        const configPath = searchingFile.find(
          (cond) => typeof cond === 'string',
        ) as string;
        const options = (await import(configPath)).default as LunConfig;

        resolve(options);
      } else resolve(defaultConfig);
    } catch {
      reject(defaultConfig);
    }
  });
};