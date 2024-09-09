import { ClassName, Css, Template } from '../models';
import { componentWithJs } from './componentWithJs';
import { componentWithTsx } from './componentWithTsx';

interface TemplateProps {
  component: string;
  type: Template;
  cssType: Css;
  className: ClassName;
}

export const templateComponent = ({ component, type, cssType, className }: TemplateProps) => {
  const fun = type === 'react' ? componentWithJs : componentWithTsx;

  return fun(component, cssType, className);
};

export const templateCSS = `.container {
  border: 1px solid #09f;
}`;

export const templateIndexComponent = ({
  component,
  type,
}: Omit<TemplateProps, 'cssType' | 'className'>) => {
  if (type === 'react') {
    return `export { default as ${component} } from './${component}'
`;
  }

  return `export { default as ${component}, type ${component}Props } from './${component}';
`;
};
