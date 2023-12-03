import fs from 'node:fs';
import colors from 'picocolors';

import { getExt } from '../utils/getExt';
import { defaultConfig } from '../constants';
import { updateIndex } from '../utils/updateIndex';
import { getRootPath } from '../utils/path';
import type { PrintCreate, LunConfig, CreateComponent } from '../models';
import {
  templateCSS,
  templateComponent,
  templateIndexComponent,
} from '../templates/base';

export class Lun {
  private options: LunConfig = defaultConfig;
  private dir: string = getRootPath(defaultConfig.root);

  setOptions(value: LunConfig) {
    this.options = value;
    this.dir = getRootPath(this.options.root);
  }

  private printCreate = ({ type, name }: PrintCreate) => {
    console.log(colors.cyan(`[+] ${type} ${name} has created 🍕`));
  };

  private printMissing = ({ type }: Partial<PrintCreate>) => {
    console.log(colors.bgRed(`[-] you need set name to the new ${type}`));
  };

  getFullPathComponent = (componentName: string, filename: string) =>
    getRootPath(this.dir, `components/${componentName}/${filename}`);

  getPathComponentsFolder = (folder: string = '') =>
    getRootPath(this.dir, `components/${folder}`);

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

  createContext() {
    this.printCreate({ type: 'context', name: 'componentName' });
  }

  createPage() {
    this.printCreate({ type: 'page', name: 'componentName' });
  }
}
