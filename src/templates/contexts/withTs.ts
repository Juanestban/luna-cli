import { TemplateProps } from '../../models';

export const withTs = ({ name }: Pick<TemplateProps, 'name'>) => {
  return `import { useState, useContext, createContext, type PropsWithChildren } from 'react';

interface ${name}ContextProps {
  state: {};
  setState: () => void;
}

const ${name}Context = createContext<${name}ContextProps>({
  state: {},
  setState: () => {}
})

interface ${name}Props extends PropsWithChildren {
}

function ${name}({ children }: ${name}Props) {
  const [state, setState] = useState({})
  
  return (
    <${name}Context.Provider value={{ state, setState }}>
      {children}
    </${name}Context.Provider>
  )
}

/**
 * suggestion: rename this hook and integrate with
 * the same name that you be using on function and
 * export this hook
 */
const useHook = () => useContext(${name}Context)

export default ${name}
export { ${name}Context }
export type { ${name}Props }
`;
};

export const indexWithTs = ({ name }: Pick<TemplateProps, 'name'>) => {
  return `export { default as ${name}, ${name}Context, type ${name}Props } from './${name}';\n`;
};
