import { LunConfig } from '../models';

export const defaultConfig: LunConfig = {
  root: 'src',
  pagesFolder: 'views',
  defaultTemplate: 'react',
  provider: 'context',
  css: 'module',
  className: 'clsx',
};

export const extsConfigFile = ['js', 'cjs', 'mjs'];
