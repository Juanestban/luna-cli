import { TemplateProps } from '../../models';

export const withTs = ({ name }: Pick<TemplateProps, 'name'>) => {
  return `import { useState, useContext, createContext } from 'react';

interface ${name}ContextType {
  state: {};
  setState: () => void;
}

const ${name}Context = createContext<${name}ContextType>({
  state: {},
  setState: () => {},
});

function ${name}Provider({ children }) {
  const [state, setState] = useState({});

  return (
    <${name}Context.Provider value={{ state, setState }}>
      {children}
    </${name}Context.Provider>
  );
}

/**
 * export this hook in another file into hook folder.
 * it's a suggestion if you be using Vite with HMR (Hot Module Replace)
 */
const use${name} = () => useContext(${name}Context);

export default ${name}Provider;
export { ${name}Context, use${name} };
`;
};

export const indexWithTs = ({ name }: Pick<TemplateProps, 'name'>) => {
  return `export { default as ${name}Provider, ${name}Context, use${name} } from './${name}';\n`;
};
