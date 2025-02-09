import { Css } from '../models';

export const componentWithTsx = (componentName: string, type: Css) => {
  return `import type { FC, ComponentProps } from 'react';
import cn from 'clsx';

${
  type === 'module'
    ? `import s from './${componentName}.module.css'`
    : `import './${componentName}.css'`
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
