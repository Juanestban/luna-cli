import { Template } from './template.models';
export interface PrintCreate {
  type: 'component' | 'page' | 'context';
  name: string;
}

export interface CreateComponent {
  componentName?: string;
  type?: Template;
}
