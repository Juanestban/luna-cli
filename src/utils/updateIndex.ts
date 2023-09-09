import fs from 'node:fs';

interface UpdateIndexProps {
  path: string;
  newFile: string;
  type: 'react' | 'react-ts';
}

export const updateIndex = ({ path, type, newFile }: UpdateIndexProps) => {
  const indexPath = `${path}/index.${type === 'react-ts' ? 'ts' : 'js'}`;

  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, '');
  }

  const data = fs.readFileSync(indexPath, 'utf-8');
  const finalText = `export { ${newFile}${
    type === 'react-ts' ? `, type ${newFile}Props` : ''
  } } from './${newFile}'${type === 'react-ts' ? ';' : ''}`;

  const newExportComponent = data.length === 0 ? finalText : `${data}\n${finalText}`;

  fs.writeFileSync(indexPath, newExportComponent);
};
