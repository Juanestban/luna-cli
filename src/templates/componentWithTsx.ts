import { Css } from '../models';

export const componentWithTsx = (componentName: string, type: Css) => {
  return `import type { FC, ComponentProps } from 'react';
import cn from 'clsx';

import ${type === 'module' ? `s from './${componentName}.module.css'` : `'./${componentName}.css'`}

type PrimitiveProps = Omit<ComponentProps<'div'>, 'ref'>

interface ${componentName}Props extends PrimitiveProps {
  // your props
}
  
interface ${componentName}Props extends ComponentProps<'div'> {
  //
}
  
const ${componentName}: FC<${componentName}Props> = ({ ref, className, children, ...props }) => {
  return (
    <div ref={ref} className={cn(s.container, className)} {...props}>
      {children}
    </div>
  );
};
  
export default ${componentName};
export type { ${componentName}Props };
`;
};
