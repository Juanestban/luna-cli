import { TemplateProps } from '../../models';

export const withJs = ({ name }: Pick<TemplateProps, 'name'>) => {
  return `import { useState, useContext, createContext } from 'react';

const ${name}Context = createContext({
  state: {},
  setState: () => {}
})

function ${name}({ children }) {
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
`;
};

export const indexWithJs = ({ name }: Pick<TemplateProps, 'name'>) => {
  return `export { default as ${name}, ${name}Context } from './${name}';\n`;
};
