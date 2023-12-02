import path from 'node:path';

export const getRootPath = (...args: string[]) => path.resolve(process.cwd(), ...args);

export const dir = getRootPath('src');

export const getPath = (componentName: string, filename: string) =>
  path.resolve(dir, `components/${componentName}/${filename}`);

export const getPathComponentsFolder = (folder: string = '') =>
  path.resolve(dir, `components/${folder}`);
