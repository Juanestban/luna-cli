import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/cli.ts',
    'src/lunConfig.ts',
    'src/controller/lun.controller.ts',
  ],
  clean: true,
  declaration: true,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    cjsBridge: true,
    esbuild: {
      target: 'node18',
    },
  },
});
