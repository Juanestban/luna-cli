import { cac } from 'cac';

import { VERSION } from './constants';
import { Template } from './models';
import { Lun } from './controller/lun.controller';
import { getOptions } from './utils/getOptions';

type Option = Record<'t' | 'template', Template>;

const cli = cac('');

const lun = new Lun();

cli
  .command('[componentName]', 'command for generate component')
  .option(
    '-t, --template <template>',
    '[react | react-ts] > Can generate component using react with javascript or typescript',
  )
  .action(async (...options: any[]) => {
    const [componentName, args] = options;
    const { t: type } = (args ?? {}) as Option;
    const optionsLunConfig = await getOptions();

    lun.setOptions(optionsLunConfig);
    lun.createComponent({ componentName, type });
  });

cli.help();
cli.version(VERSION);

cli.parse();
