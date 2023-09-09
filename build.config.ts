import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    cjsBridge: true,
    esbuild: {
      target: 'node18',
      minify: true,
    },
  },
});
