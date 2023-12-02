import { Template } from '../models';

/** if conditional equal to "react-ts" so will return op1, else op2 */
export const getExt = (conditional: Template) => {
  const typescriptFile = ['ts', 'tsx'];
  const javascriptFile = ['js', 'jsx'];
  const finalCond = conditional === 'react-ts' ? typescriptFile : javascriptFile;

  return { extIndex: finalCond[0], extComponent: finalCond[1] };
};
