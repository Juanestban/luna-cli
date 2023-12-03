import { Css, Template } from '../models';
import { componentWithJs } from './componentWithJs';
import { componentWithTsx } from './componentWithTsx';

interface TemplateProps {
  component: string;
  type: Template;
  cssType: Css;
}

export const templateComponent = ({ component, type, cssType }: TemplateProps) => {
  const fun = type === 'react' ? componentWithJs : componentWithTsx;

  return fun(component, cssType);
};

export const templateCSS = `.container {
  border: 1px solid #09f;
}`;

export const templateIndexComponent = ({
  component,
  type,
}: Omit<TemplateProps, 'cssType'>) => {
  if (type === 'react') {
    return `export { default as ${component} } from './${component}'
`;
  }

  return `export { default as ${component}, type ${component}Props } from './${component}';
`;
};
