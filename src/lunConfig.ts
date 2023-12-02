import { defaultConfig } from './constants';
import { LunConfig } from './models';

export const defineLunConfig = (config: Partial<LunConfig>): LunConfig => {
  return { ...defaultConfig, ...config };
};
