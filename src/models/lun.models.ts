import { Template } from './template.models';
export interface PrintCreate {
  type: 'component' | 'page' | 'context';
  name: string;
}

export interface CreateComponent {
  componentName?: string;
  type?: Template;
}

export interface CreatePage {
  pageName: string;
  type?: Template;
}

export interface CreateContext {
  contextName: string;
  type?: Template;
}

export interface TemplateProps {
  name: string;
  type?: Template;
}
