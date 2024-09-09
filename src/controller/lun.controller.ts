import fs from 'node:fs';
import colors from 'picocolors';
import path from 'node:path';

import { getExt } from '../utils/getExt';
import { defaultConfig } from '../constants';
import { updateIndex } from '../utils/updateIndex';
import { getRootPath } from '../utils/path';
import type {
  PrintCreate,
  LunConfig,
  CreateComponent,
  Css,
  CreatePage,
  CreateContext,
  ClassName,
} from '../models';
import { templateCSS, templateComponent, templateIndexComponent } from '../templates/base';
import { getTemplateIndex, getTemplatePage } from '../templates/pages';
import { getTemplateContext } from '../templates/contexts';

export class Lun {
  private options: LunConfig = defaultConfig;
  private dir: string = getRootPath(defaultConfig.root);
  private dirFolderPage: string = getRootPath(defaultConfig.root, defaultConfig.pagesFolder);
  private dirFolderContext: string = getRootPath(defaultConfig.root, defaultConfig.provider);
  private cssType: Css = 'module';
  private className: ClassName = 'clsx';

  setOptions(value: LunConfig) {
    this.options = value;
    this.dir = getRootPath(this.options.root);
    this.dirFolderPage = getRootPath(this.options.root, this.options.pagesFolder);
    this.dirFolderContext = getRootPath(this.options.root, this.options.provider);
    this.cssType = this.options.css;
    this.className = this.options.className;
  }

  private printCreate = ({ type, name }: PrintCreate) => {
    console.log(colors.cyan(`[+] ${type} ${name} has created 🍕`));
  };

  private printMissing = ({ type }: Partial<PrintCreate>) => {
    console.log(colors.bgRed(`[-] you need set name to the new ${type}`));
  };

  getFullPathComponent = (componentName: string, filename: string) =>
    getRootPath(this.dir, `components/${componentName}/${filename}`);

  getPathComponentsFolder = (folder: string = '') => getRootPath(this.dir, `components/${folder}`);

  createComponent({ componentName, type }: CreateComponent) {
    if (!componentName || typeof componentName === 'object') {
      this.printMissing({ type: 'component' });
      return;
    }

    const { defaultTemplate } = this.options;
    const typeTemplate = type ?? defaultTemplate;

    const fileComponent = templateComponent({
      component: componentName,
      type: typeTemplate,
      cssType: this.cssType,
      className: this.className,
    });
    const fileIndex = templateIndexComponent({
      component: componentName,
      type: typeTemplate,
    });
    const { extIndex, extComponent } = getExt(typeTemplate);
    const filenameComponent = `${componentName}.${extComponent}`;
    const filenameIndex = `index.${extIndex}`;
    const filenameCss = `${componentName}.module.css`;
    const pathComponent = this.getFullPathComponent(componentName, filenameComponent);
    const pathIndexComponent = this.getFullPathComponent(componentName, filenameIndex);
    const pathStyles = this.getFullPathComponent(componentName, filenameCss);

    const pathIndexFolderComponents = this.getPathComponentsFolder();
    const folderComponent = this.getPathComponentsFolder(componentName);
    const folderBaseComponent = this.getPathComponentsFolder();

    if (!fs.existsSync(folderBaseComponent)) fs.mkdirSync(folderBaseComponent);
    if (!fs.existsSync(folderComponent)) fs.mkdirSync(folderComponent);

    fs.writeFileSync(pathComponent, fileComponent);
    fs.writeFileSync(pathIndexComponent, fileIndex);
    fs.writeFileSync(pathStyles, templateCSS);
    updateIndex({
      path: pathIndexFolderComponents,
      newFile: componentName,
      type: typeTemplate,
    });

    this.printCreate({ type: 'component', name: componentName });
  }

  createContext({ contextName, type }: CreateContext) {
    if (typeof contextName !== 'string') {
      this.printMissing({ type: 'context' });
      return;
    }

    const { defaultTemplate } = this.options;
    const typeTemplate = type ?? defaultTemplate;
    const { extIndex, extComponent } = getExt(typeTemplate);
    const folderPath = this.dirFolderContext;
    const folderContextComponent = path.resolve(folderPath, contextName);
    const templateContext = path.resolve(folderContextComponent, `${contextName}.${extComponent}`);
    const templateIndexContext = path.resolve(folderContextComponent, `index.${extIndex}`);

    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
    if (!fs.existsSync(folderContextComponent)) fs.mkdirSync(folderContextComponent);

    fs.writeFileSync(
      templateContext,
      getTemplateContext({ name: contextName, type: typeTemplate }),
    );
    fs.writeFileSync(
      templateIndexContext,
      getTemplateIndex({ name: contextName, type: typeTemplate }),
    );

    this.printCreate({ type: 'context', name: contextName });
  }

  createPage({ pageName, type }: CreatePage) {
    if (typeof pageName !== 'string') {
      this.printMissing({ type: 'page' });
      return;
    }

    const { defaultTemplate } = this.options;
    const typeTemplate = type ?? defaultTemplate;
    const { extIndex, extComponent } = getExt(typeTemplate);
    const folderPath = this.dirFolderPage;
    const folderPageComponent = path.resolve(folderPath, pageName);
    const templatePage = path.resolve(folderPageComponent, `${pageName}.${extComponent}`);
    const templateIndexPage = path.resolve(folderPageComponent, `index.${extIndex}`);

    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
    if (!fs.existsSync(folderPageComponent)) fs.mkdirSync(folderPageComponent);

    fs.writeFileSync(templatePage, getTemplatePage({ name: pageName, type: typeTemplate }));
    fs.writeFileSync(templateIndexPage, getTemplateIndex({ name: pageName, type: typeTemplate }));

    this.printCreate({ type: 'page', name: pageName });
  }
}
