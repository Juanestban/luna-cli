import { cac } from 'cac';
import fs from 'node:fs';
import colors from 'picocolors';
import path from 'node:path';

import { APP_NAME, VERSION } from './constants';
import { templateComponent, templateIndexComponent, templateCSS } from './templates/base';
import { updateIndex } from './utils/updateIndex';

const cli = cac(APP_NAME);

type Option = { t?: 'react' | 'react-ts'; template?: 'react' | 'react-ts' };

cli
  .command('[root] [componentName]', 'command for generate component')
  .option(
    '-t, --template <template>',
    '[react | react-ts] > Can generate component using react with javascript or typescript',
  )
  .action(async (...options: any[]) => {
    const [componentName, args] = options
      .sort((a) => (typeof a !== 'function' ? 0 : 1))
      .slice(1);
    const { t: type = 'react' } = args as Option;

    const fileComponent = templateComponent({
      component: componentName,
      type,
    });
    const fileIndex = templateIndexComponent({
      component: componentName,
      type,
    });
    const dir = path.resolve(process.cwd(), 'src');
    const getPath = (filename: string) =>
      path.resolve(dir, `components/${componentName}/${filename}`);
    const getPathComponentsFolder = (folder: string = '') =>
      path.resolve(dir, `components/${folder}`);

    const isUsingTsx = type === 'react-ts';

    const pathComponent = getPath(`${componentName}.${isUsingTsx ? 'tsx' : 'jsx'}`);
    const pathIndexComponent = getPath(`index.${isUsingTsx ? 'ts' : 'js'}`);
    const pathStyles = getPath(`${componentName}.module.css`);
    const pathIndexFolderComponents = getPathComponentsFolder();

    const folderComponent = getPathComponentsFolder(componentName);
    const folderBaseComponent = getPathComponentsFolder();

    if (!fs.existsSync(folderBaseComponent)) fs.mkdirSync(folderBaseComponent);
    if (!fs.existsSync(folderComponent)) fs.mkdirSync(folderComponent);

    fs.writeFileSync(pathComponent, fileComponent);

    fs.writeFileSync(pathIndexComponent, fileIndex);

    fs.writeFileSync(pathStyles, templateCSS);

    updateIndex({
      path: pathIndexFolderComponents,
      newFile: componentName,
      type,
    });

    console.log(colors.cyan(`[+] component ${componentName} has created 🍕`));
  });

cli.help();
cli.version(VERSION);

cli.parse();
