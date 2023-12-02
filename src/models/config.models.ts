import { Template } from './template.models';

export interface LunConfig {
  /** by default [src] - options: 'src' | 'app' | string */
  root: string;
  /** by default [views] - options 'views' | 'pages' */
  pagesFolder: 'views' | 'pages';
  /** by default [react] */
  defaultTemplate: Template;
  /** context or provider folder name, by default [contexts] - options 'contexts' | 'providers' */
  provider: string;
  /** css - vanilla or module */
  css: 'vanilla' | 'module';
}
