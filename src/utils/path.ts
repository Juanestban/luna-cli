import path from 'node:path';

export const getRootPath = (...args: string[]) => path.resolve(process.cwd(), ...args);
