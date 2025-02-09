import { LunConfig } from '../models';

export const defaultConfig: LunConfig = {
  root: 'src',
  pagesFolder: 'views',
  defaultTemplate: 'react',
  provider: 'context',
  css: 'module',
};

export const extsConfigFile = ['cjs', 'mjs'];
