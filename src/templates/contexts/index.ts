import { TemplateProps } from '../../models';

import { withJs, indexWithJs } from './withJs';
import { withTs, indexWithTs } from './withTs';

export const getTemplateContext = ({ name, type }: TemplateProps) => {
  const fn = type === 'react-ts' ? withTs : withJs;

  return fn({ name });
};

export const getTemplateIndexContext = ({ name, type }: TemplateProps) => {
  const fn = type === 'react-ts' ? indexWithTs : indexWithJs;

  return fn({ name });
};
