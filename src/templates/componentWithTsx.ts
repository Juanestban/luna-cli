import { Css } from '../models';

export const componentWithTsx = (componentName: string, type: Css) => {
  return `import { FC, DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

${
  type === 'module'
    ? `import s from './${componentName}.module.css'`
    : `import './${componentName}.css'`
}
  
interface ${componentName}Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  //
}
  
const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(s.container, className)} {...props}>
        {children}
      </div>
    );
  }
) as FC<${componentName}Props>;
  
export default ${componentName};
export type { ${componentName}Props }

`;
};
