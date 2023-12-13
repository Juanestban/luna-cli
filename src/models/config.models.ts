import { Template } from './template.models';

export type Css = 'vanilla' | 'module';

export type PagesFolderName = 'views' | 'pages';

export interface LunConfig {
  /** by default [src] - options: 'src' | 'app' | string */
  root: string;
  /** by default [views] - options 'views' | 'pages' */
  pagesFolder: PagesFolderName;
  /** by default [react] - options 'react' | 'react-ts' */
  defaultTemplate: Template;
  /** context or provider folder name, by default [contexts] - options 'contexts' | 'providers' */
  provider: string;
  /** css - vanilla or module */
  css: Css;
}
