import { cac } from 'cac';

import { TEXT_TEMPLATE_FLAG_DESCRIPTION, VERSION } from './constants';
import { Template } from './models';
import { Lun } from './controller/lun.controller';
import { getOptions } from './utils/getOptions';

type Option = Record<'t' | 'template', Template>;

const cli = cac('');

const lun = new Lun();

cli
  .command('generate-component [componentName]', 'command for generate component')
  .alias('gc')
  .option('-t, --template <template>', TEXT_TEMPLATE_FLAG_DESCRIPTION)
  .action(async (...options: any[]) => {
    const [componentName, args] = options;
    const { t: type } = (args ?? {}) as Option;
    const optionsLunConfig = await getOptions();

    lun.setOptions(optionsLunConfig);
    lun.createComponent({ componentName, type });
  });

cli
  .command('generate-page [pageName]', 'command for generate component type page')
  .alias('gp')
  .option('-t, --template <template>', TEXT_TEMPLATE_FLAG_DESCRIPTION)
  .action(async (...options: any[]) => {
    const [pageName, args] = options;
    const { t: type } = (args ?? {}) as Option;
    const optionsLunConfig = await getOptions();

    lun.setOptions(optionsLunConfig);
    lun.createPage({ pageName, type });
  });

cli
  .command('generate-context [contextName]', 'command for generate context')
  .alias('gctx')
  .option('-t, --template <template>', TEXT_TEMPLATE_FLAG_DESCRIPTION)
  .action(async (...options: any[]) => {
    const [contextName, args] = options;
    const { t: type } = (args ?? {}) as Option;
    const optionsLunConfig = await getOptions();

    lun.setOptions(optionsLunConfig);
    lun.createContext({ contextName, type });
  });

cli.help();
cli.version(VERSION);

cli.parse();
