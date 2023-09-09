import { componentWithJs } from './componentWithJs';
import { componentWithTsx } from './componentWithTsx';

interface TemplateProps {
  component: string;
  type: 'react' | 'react-ts';
}

export const templateComponent = ({ component, type }: TemplateProps) => {
  return type === 'react' ? componentWithJs(component) : componentWithTsx(component);
};

export const templateCSS = `.container {
  border: 1px solid #09f;
}`;

export const templateIndexComponent = ({ component, type }: TemplateProps) => {
  if (type === 'react') {
    return `export { default as ${component} } from './${component}'
`;
  }

  return `export { default as ${component}, type ${component}Props } from './${component}';
`;
};
